import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class CodePluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'code'
    }
    handle(plugin: plugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}