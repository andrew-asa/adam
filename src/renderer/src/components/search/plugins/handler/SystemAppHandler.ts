import { openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class SystemAppHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'app'
    }
    open(plugin: plugin,): void {
        this.store.emptyShow();
        this.store._setSearchValue("");
        openPlugin(plugin)
    }
}