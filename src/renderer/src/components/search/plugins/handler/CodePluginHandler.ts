import { AdamPlugin } from "@/common/core/plugins";
import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class CodePluginHandler extends DefaultPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.pluginType === 'code'
    }
    open(plugin: AdamPlugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}