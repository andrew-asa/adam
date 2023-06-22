import { closePlugin, openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin } from "@/common/core/plugins";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'web'
    }
    open(plugin: AdamPlugin): void {
        super.open(plugin)
        openPlugin(plugin)
    }
    close(plugin: AdamPlugin): void {
        closePlugin(plugin)
        this.store.removeCurrentPlugin()
    }
}