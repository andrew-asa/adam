import _ from "lodash"

export class DefaultPluginHandler {
    private store: any
    constructor(store) {
        this.store = store
    }
    needHandler(plugin: plugin): boolean {
        return false
    }
    handler(plugin: plugin, store: any): void {
        let setCurrentSelect = _.findIndex(store.options, plugin)
        if (setCurrentSelect > -1) {
            store.setCurrentSelect(setCurrentSelect)
            store.setCurrentPlugin(plugin);
            store._setSearchValue("");
        }
    }
}