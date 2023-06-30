import { ThirdPlugin } from "@/common/core/plugins";
import { DefaultUIPluginHandler } from "./DefaultUIPluginHandler";
import { BrowserView, Session } from "electron";
import { getPluginManager } from "../../contronler";

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
        // 内部模块
        // this.loadSession(this.view, plugin,session)
        // this.loadPreload(this.view, plugin)
        // this.loadUrl(this.view, plugin)
        getPluginManager().loadMain(plugin, {
            session: session,
            view: view
        })
    }

    close(plugin: ThirdPlugin, ext: any): void {
        console.log(`UIPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        super.close(plugin, ext)
    }

    loadUrl(view: BrowserView | undefined, plugin: ThirdPlugin): void {
        if (!view) return

    }

    loadSession(view: BrowserView | undefined, plugin: ThirdPlugin,session: Session): void {
        if (!view) return
        // session.setPreloads([plugin.main])
    }

    loadPreload(view: BrowserView | undefined, plugin: ThirdPlugin): void {
        if (!view) return
    }
}