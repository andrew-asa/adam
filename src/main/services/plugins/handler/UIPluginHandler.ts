import { ThirdPlugin } from "@/common/core/plugins";
import { DefaultUIPluginHandler } from "./DefaultUIPluginHandler";
import { BrowserView, Session } from "electron";
import { getPluginManager } from "../../contronler";
import { getPluginFilePath } from "../utils/plugin_utils";

export class UIPluginHandler extends DefaultUIPluginHandler {
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType.toLocaleLowerCase() === 'ui'
    }

    open(plugin: ThirdPlugin, { mainWindow }): void {

        console.log(`UIPluginHandler open: ${plugin.name}|${plugin.pluginName}`);
        super.open(plugin, { mainWindow })
    }

    loadMain(view: BrowserView,
        plugin: ThirdPlugin, {
            session
        }): void {
        let url = plugin.main || ''
        getPluginManager().loadMain(plugin, {
            session: session,
            view: view
        })
    }
    getPreload(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin.name, plugin.preload)
    }

    customSession(plugin: ThirdPlugin, session: Session) {
        const preloads = getPluginManager().getPreloads(plugin)
        session.setPreloads(preloads)
    }

    close(plugin: ThirdPlugin, ext: any): void {
        console.log(`UIPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        super.close(plugin, ext)
    }

}