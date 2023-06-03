import { PluginHandler } from "@/common/core/PluginHandler"
import _ from "lodash"

export class DefaultPluginHandler implements PluginHandler {
    protected store: any
    constructor(store) {
        this.store = store
    }
    needHandle(plugin: plugin): boolean {
        return false
    }
    handle(plugin: plugin): void {
        this.updateCurrentPlugin(plugin, this.store)
    }
    updateCurrentPlugin(plugin: plugin, store: any): void {
        let setCurrentSelect = _.findIndex(store.options, plugin)
        if (setCurrentSelect > -1) {
            store.setCurrentSelect(setCurrentSelect)
            store.setCurrentPlugin(plugin);
            store._setSearchValue("");
        }
    }
}