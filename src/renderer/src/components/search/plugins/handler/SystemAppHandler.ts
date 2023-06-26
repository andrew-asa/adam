import { openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin } from "@/common/core/plugins";

export class SystemAppHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.pluginType === 'app'
    }
    open(plugin: AdamPlugin): void {
        this.store.emptyShow();
        this.store._setSearchValue("");
        openPlugin(plugin)
    }
}