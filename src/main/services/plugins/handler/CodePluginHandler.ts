import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class CodePluginHandler extends AbstractPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'code'
    }
    open(plugin: ThirdPlugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}