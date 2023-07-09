import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";

export class WebPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'web'
    }
}