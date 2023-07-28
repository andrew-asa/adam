import { openApp } from "@main/services/appsearch";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { SystemApp, ThirdPlugin } from "@/common/core/plugins";
import { PluginHandler } from "@/common/core/PluginHandler";
import { copyThirdPluginToAppPlugin } from "@/common/common_utils";

export class InternalPluginHandler extends AbstractPluginHandler implements PluginHandler {

    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType === 'internal'
    }
    open(plugin: ThirdPlugin): void {
        
    }
}