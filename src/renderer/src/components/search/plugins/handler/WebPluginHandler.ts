import { openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'web'
    }
    handle(plugin: plugin): void {
        super.handle(plugin)
        openPlugin(plugin)
    }
}