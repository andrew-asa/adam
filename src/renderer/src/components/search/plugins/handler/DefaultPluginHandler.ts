import { PluginHandler } from "@/common/core/PluginHandler"
import { ThirdPlugin } from "@/common/core/plugins"
import _ from "lodash"
import { ctx } from "@renderer/core/context";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";
import { export_stores_name } from "@/common/common_const";
import { getStore } from "@/common/base/store";

export class DefaultPluginHandler implements PluginHandler {
    constructor() {
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return false
    }
    open(plugin: ThirdPlugin, options?: any): void {
        const store = getStore(export_stores_name.renderer.plugin_stores)
        this.updateCurrentPlugin(plugin, store)
        const cp = copyThirdPlugin(plugin)
        // ctx.app.controller.openPlugin(cp)
        ctx.services.plugin.openPlugin(cp, this.getOptions(plugin, options))
    }
    getOptions(plugin: ThirdPlugin, options?: any): any {
        return options || {}
    }
    close(plugin: ThirdPlugin): void {
        const cp = copyThirdPlugin(plugin)
        const store = getStore(export_stores_name.renderer.plugin_stores)
        store.removeCurrentPlugin()
        ctx.services.plugin.closePlugin(cp)
    }
    updateCurrentPlugin(plugin: ThirdPlugin, store: any): void {
        let setCurrentSelect = _.findIndex(store.options, plugin)
        store.setCurrentSelect(setCurrentSelect)
        store.setCurrentPlugin(plugin);
        store._setSearchValue("");
        store.setPlaceholder("");
        this.emptyOptions(store)
        // if (setCurrentSelect > -1) {
        // }
    }

    emptyOptions(store: any): void {
        store.setOptions([])
    }
}