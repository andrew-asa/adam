import { ThirdPlugin } from "@/common/core/plugins";
import { DefaultUIPluginHandler } from "./DefaultUIPluginHandler";
import { BrowserView } from "electron";

export class UIPluginHandler extends DefaultUIPluginHandler {
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType.toLocaleLowerCase() === 'ui'
    }

    open(plugin: ThirdPlugin, { mainWindow }): void {

        console.log(`UIPluginHandler open: ${plugin.name}|${plugin.pluginName}`);
        super.open(plugin, { mainWindow })
        this.loadSession(this.view, plugin)
        this.loadPreload(this.view, plugin)
        this.loadUrl(this.view, plugin)
    }

    close(plugin: ThirdPlugin, ext: any): void {
        console.log(`UIPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        super.close(plugin, ext)
    }

    loadUrl(view: BrowserView | null, plugin: ThirdPlugin): void {
        if (!view) return

    }

    loadSession(view: BrowserView | null, plugin: ThirdPlugin): void {
        if (!view) return
    }

    loadPreload(view: BrowserView | null, plugin: ThirdPlugin): void {
        if (!view) return
    }
}