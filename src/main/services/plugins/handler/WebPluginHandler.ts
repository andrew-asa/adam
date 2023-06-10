import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'web'
    }
    handle(plugin: plugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}