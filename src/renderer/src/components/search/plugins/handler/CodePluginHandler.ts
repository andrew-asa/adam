import { AdamPlugin } from "@/common/core/plugins";
import { DefaultPluginHandler } from "./DefaultPluginHandler";

export class CodePluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'code'
    }
    open(plugin: AdamPlugin): void {
        console.log(`CodePluginHandler: ${plugin.name}`);
    }
}