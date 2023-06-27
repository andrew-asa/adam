import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { PluginHandler } from "@/common/core/PluginHandler";

export class CodePluginHandler extends AbstractPluginHandler implements PluginHandler {

    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'code'
    }
}