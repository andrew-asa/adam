import { openApp } from "@main/services/appsearch";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { SystemApp, ThirdPlugin } from "@/common/core/plugins";

export class SystemAppHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'app'
    }
    open(plugin: ThirdPlugin): void {
        super.open(plugin);
        openApp(plugin as SystemApp)
    }
}