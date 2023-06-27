import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { getStore, registerStore } from "@/main/common/strore";
import { actions_name, default_plugin_window_height, default_window_height, stores_name } from "@/main/common/common_const";
import { getAction } from "@/main/common/action";
import { PluginHandler } from "@/common/core/PluginHandler";
import { BrowserView, BrowserWindow, session } from "electron";

export class DefaultUIPluginHandler extends AbstractPluginHandler implements PluginHandler {
    view: BrowserView | null = null

    constructor() {
        super()
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return false
    }

    open(plugin: ThirdPlugin, { mainWindow }): void {

        const wm: BrowserWindow = mainWindow
        const view = this.createDefaultView(plugin)
        wm.addBrowserView(view);
        // view.webContents.openDevTools();
        const { width, height } = wm.getBounds()
        wm.setSize(width, default_window_height);

        //  dom-ready
        view.webContents.once('did-finish-load', () => {
            view.setBounds({ x: 0, y: default_window_height, width: width, height: default_plugin_window_height });
            wm.setSize(width, default_window_height + default_plugin_window_height);
            view.setAutoResize({ width: true });
        });
        this.view = view
        registerStore(stores_name.current_plugin_view, view)
    }

    close(plugin: ThirdPlugin, ext: any): void {
        this.closeCurrentView()
        this.view = null
    }

    createDefaultView(plugin: ThirdPlugin): BrowserView {
        const { name } = plugin;
        const ses = session.fromPartition('<' + name + '>');
        return new BrowserView({
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                webviewTag: true,
                //   preload,
                session: ses,
            },
        });
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