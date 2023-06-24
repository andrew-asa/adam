import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin } from "@/common/core/plugins";
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { copyPlugin } from "../utils/plugins_utils";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'web'
    }
    open(plugin: AdamPlugin): void {
        super.open(plugin)
        const cp = copyPlugin(plugin)
        // openPlugin(cp)
        ctx.app.controller.openPlugin(cp)
    }
    close(plugin: AdamPlugin): void {
        const cp = copyPlugin(plugin)
        ctx.app.controller.closePlugin(cp)
        this.store.removeCurrentPlugin()
        // closePlugin(plugin)
    }
}