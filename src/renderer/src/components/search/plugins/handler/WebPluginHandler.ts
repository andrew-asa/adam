import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { copyThirdPlugin } from "../utils/plugins_utils";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.pluginType === 'web'
    }
    open(plugin: ThirdPlugin): void {
        super.open(plugin)
        const cp = copyThirdPlugin(plugin)
        // openPlugin(cp)
        ctx.app.controller.openPlugin(cp)
    }
    close(plugin: AdamPlugin): void {
        const cp = copyThirdPlugin(plugin)
        ctx.app.controller.closePlugin(cp)
        this.store.removeCurrentPlugin()
        // closePlugin(plugin)
    }
}