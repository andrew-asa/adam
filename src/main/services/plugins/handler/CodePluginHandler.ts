import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class CodePluginHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'code'
    }
    handle(plugin: plugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}