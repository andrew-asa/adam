import { openApp } from "@main/services/appsearch";
import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class SystemAppHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'app'
    }
    open(plugin: plugin): void {
        super.open(plugin);
        openApp(plugin as app)
    }
}