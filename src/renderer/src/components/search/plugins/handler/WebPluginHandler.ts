import { closePlugin, openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'web'
    }
    open(plugin: plugin): void {
        super.open(plugin)
        openPlugin(plugin)
    }
    close(plugin: plugin): void {
        closePlugin(plugin)
        this.store.removeCurrentPlugin()
    }
}