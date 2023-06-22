import { openApp } from "@main/services/appsearch";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { AdamPlugin, SystemApp } from "@/common/core/plugins";

export class SystemAppHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'app'
    }
    open(plugin: AdamPlugin): void {
        super.open(plugin);
        openApp(plugin as SystemApp)
    }
}