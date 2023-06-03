import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class DefaultPluginHandler extends AbstractPluginHandler{
    needHandle(plugin: plugin): boolean {
        return true
    }
    handle(plugin: plugin): void {
        console.log(`DefaultPluginHandler handler: ${plugin.name}`);
    }
}