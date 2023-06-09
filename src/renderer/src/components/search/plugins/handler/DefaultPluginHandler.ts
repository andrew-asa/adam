import { PluginHandler } from "@/common/core/PluginHandler"
import { ThirdPlugin } from "@/common/core/plugins"
import _ from "lodash"
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";

export class DefaultPluginHandler implements PluginHandler {
    protected store: any
    constructor(store) {
        this.store = store
    }
   
    needHandle(plugin: ThirdPlugin): boolean {
        return false
    }
    open(plugin: ThirdPlugin): void {
        this.updateCurrentPlugin(plugin, this.store)
        const cp = copyThirdPlugin(plugin)
        // openPlugin(cp)
        ctx.app.controller.openPlugin(cp)
    }
    close(plugin: ThirdPlugin): void {
        const cp = copyThirdPlugin(plugin)
        ctx.app.controller.closePlugin(cp)
        this.store.removeCurrentPlugin()
    }
    updateCurrentPlugin(plugin: ThirdPlugin, store: any): void {
        let setCurrentSelect = _.findIndex(store.options, plugin)
        if (setCurrentSelect > -1) {
            store.setCurrentSelect(setCurrentSelect)
            store.setCurrentPlugin(plugin);
            store._setSearchValue("");
            store.setPlaceholder("");
            store.setOptions([])
        }
    }
}