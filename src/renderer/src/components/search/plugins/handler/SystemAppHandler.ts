import { export_stores_name } from "@/common/common_const";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { getStore } from "@/common/base/store";

export class SystemAppHandler extends DefaultPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'app'
    }
    open(plugin: ThirdPlugin): void {
        const store = getStore(export_stores_name.renderer.plugin_stores)
        store.emptyShow();
        store._setSearchValue("");
        const cp = copyThirdPlugin(plugin)
        ctx.services.plugin.openPlugin(cp)
    }
}