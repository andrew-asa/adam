import { ThirdPlugin } from "@/common/core/plugins";
import { DefaultUIPluginHandler } from "./DefaultUIPluginHandler";
import { BrowserView, Session } from "electron";
import { getPluginFilePath } from "../utils/plugin_utils";
import { stores_name } from "@/main/common/common_const";
import { getStore } from "@/common/base/store";

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
        getStore(stores_name.services.plugin).getPluginManager().loadMain(plugin, {
            session: session,
            view: view
        })
    }

    unloadMain(view: BrowserView, plugin: ThirdPlugin): void {
        getStore(stores_name.services.plugin).getPluginManager().unloadMain(plugin, {
            view: view
        })
    }

    getPreload(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin.name, plugin.preload)
    }

    customSession(plugin: ThirdPlugin, session: Session) {
        const preloads = getStore(stores_name.services.plugin).getPluginManager().getPreloads(plugin)
        session.setPreloads(preloads)
    }

    close(plugin: ThirdPlugin, ext: any): void {
        console.log(`UIPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        super.close(plugin, ext)
    }

}