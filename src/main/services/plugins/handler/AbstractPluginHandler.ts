import { PluginHandler } from "@/common/core/PluginHandler"
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins"
import _ from "lodash"

export class AbstractPluginHandler implements PluginHandler {
    constructor() {
    }
    close(plugin: ThirdPlugin, ext: any): void {
        // throw new Error("Method not implemented.")
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return false
    }
    open(plugin: ThirdPlugin, ext?: any): void {
    }
}