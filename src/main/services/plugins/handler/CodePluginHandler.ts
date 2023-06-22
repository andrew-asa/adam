import { AdamPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class CodePluginHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'code'
    }
    open(plugin: AdamPlugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}