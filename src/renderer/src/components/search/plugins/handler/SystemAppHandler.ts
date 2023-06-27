import { openPlugin } from "@/renderer/src/utils/app/app_api";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";

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
        openPlugin(plugin)
    }
}