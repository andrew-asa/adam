import { ctx } from "@renderer/core/context";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";
import { getStore } from "@/common/base/store";
import { export_stores_name } from "@/common/common_const";
/**
 * 内部插件管理
 */
export class InternalPluginHandler extends DefaultPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'internal'
    }

    open(plugin: ThirdPlugin, options: any): void {

        const store = getStore(export_stores_name.renderer.plugin_stores)
        super.open(plugin, options)
        store.setInternalPlugin({
            name: plugin.main,
            code: options.code
        })
        ctx.app.controller.setExpendHeight(600)
    }
    close(plugin: ThirdPlugin): void {
        super.close(plugin)
        const store = getStore(export_stores_name.renderer.plugin_stores)
        store.setInternalPlugin({})
        ctx.app.controller.setExpendHeight(60)
    }

    emptyOptions(store: any): void {
        store.setOptions([], false)
    }
}