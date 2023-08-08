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

    open(plugin: ThirdPlugin, options?: any) {

        console.log(`UIPluginHandler open: ${plugin.name}|${plugin.pluginName}`);
        return super.open(plugin, options)
    }

    loadMain(view: BrowserView,
        plugin: ThirdPlugin,data: {
            session: Session,
            options?: any
        }): void {
        let url = plugin.main || ''
        getStore(stores_name.services.plugin).getPluginManager().loadMain(plugin, {
            session: data.session,
            view: view,
            options: data.options
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

    close(plugin: ThirdPlugin, ext: any) {
        console.log(`UIPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        return super.close(plugin, ext)
    }

}