import { PluginHandler } from "@/common/core/PluginHandler"
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins"
import _ from "lodash"

export class AbstractPluginHandler {

    close(plugin: ThirdPlugin, ext: any): void {
    }

    open(plugin: ThirdPlugin, ext?: any): void {
    }
}