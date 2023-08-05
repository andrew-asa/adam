import _ from "lodash";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { ThirdPlugin } from "@/common/core/plugins";

export class UIPluginHandler extends DefaultPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType === 'ui'
    }


    getOptions(plugin: ThirdPlugin, options?: any): any {
        const ext = plugin.ext
        const code = _.get(ext, 'code')
        const type = _.get(ext, 'type')
        return _.extend({}, options || {}, { code: code, type: type })
    }
}