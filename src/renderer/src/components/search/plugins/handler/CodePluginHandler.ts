import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { PluginHandler } from "./PluginHandler";

export class CodePluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandler(plugin: plugin): boolean {
        return plugin.type === 'code'
    }
    handler(plugin: plugin, store: any): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}