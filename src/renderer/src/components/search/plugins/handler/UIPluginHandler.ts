import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { copyThirdPlugin } from "../utils/plugins_utils";

export class UIPluginHandler extends DefaultPluginHandler {
    constructor(store) {
        super(store)
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'ui'
    }
}