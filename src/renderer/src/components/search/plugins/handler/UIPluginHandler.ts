import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";

export class UIPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'ui'
    }
}