import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class SystemAppHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandler(plugin: plugin): boolean {
        return plugin.type === 'app'
    }
    handler(plugin: plugin, store: any): void {
        super.handler(plugin, store);
        // console.log(`SystemAppHandler: ${plugin.name}`);
    }
}