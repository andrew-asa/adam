import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";
import { ctx } from "@/renderer/src/startup/ctx_starter";

export class SystemAppHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'app'
    }
    open(plugin: ThirdPlugin): void {
        this.store.emptyShow();
        this.store._setSearchValue("");
        const cp = copyThirdPlugin(plugin)
        ctx.app.controller.openPlugin(cp)
    }
}