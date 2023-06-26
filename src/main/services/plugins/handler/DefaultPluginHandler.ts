import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { getStore, registerStore } from "@/main/common/strore";
import { actions_name, stores_name } from "@/main/common/common_const";
import { getAction } from "@/main/common/action";

export class DefaultPluginHandler extends AbstractPluginHandler{
    needHandle(plugin: ThirdPlugin): boolean {
        return true
    }

    closeCurrentView(): void {
        let currentView = getStore(stores_name.current_plugin_view)
        let mainWindow = getAction(actions_name.get_main_window)()
        if (!currentView || !mainWindow) {
            return
        }
        mainWindow.setSize(800, 60);
        mainWindow.removeBrowserView(currentView);
        try {
            //@ts-ignore
            this.view.webContents.destroy()
        } catch (e) {
            console.log(e)
        }
        registerStore(stores_name.current_plugin_view, null)
    }
}