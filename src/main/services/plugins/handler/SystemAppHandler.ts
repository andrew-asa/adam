import { openApp } from "@main/services/appsearch";
import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class SystemAppHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'app'
    }
    handle(plugin: plugin): void {
        super.handle(plugin);
        openApp(plugin as app)
    }
}