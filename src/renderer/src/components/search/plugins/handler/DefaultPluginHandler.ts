import { PluginHandler } from "@/common/core/PluginHandler"
import { AdamPlugin } from "@/common/core/plugins"
import _ from "lodash"

export class DefaultPluginHandler implements PluginHandler {
    protected store: any
    constructor(store) {
        this.store = store
    }
    openPluginConsole(plugin: AdamPlugin): void {
        throw new Error("Method not implemented.")
    }
    hasOpenPlugin(): boolean {
        return false
    }
    close(plugin: AdamPlugin): void {
        this.store.removeCurrentPlugin()
    }
    needHandle(plugin: AdamPlugin): boolean {
        return false
    }
    open(plugin: AdamPlugin): void {
        this.updateCurrentPlugin(plugin, this.store)
    }
    updateCurrentPlugin(plugin: AdamPlugin, store: any): void {
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