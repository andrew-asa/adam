import { ctx } from "@/renderer/src/startup/ctx_starter";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";
/**
 * 内部插件管理
 */
export class InternalPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'internal'
    }

    open(plugin: ThirdPlugin): void {
        super.open(plugin)
        this.store.setInternalPluginName(plugin.main)
        ctx.app.controller.setExpendHeight(600)
    }
    close(plugin: ThirdPlugin): void {
        super.close(plugin)
        this.store.setInternalPluginName("")
        ctx.app.controller.setExpendHeight(60)
    }
}