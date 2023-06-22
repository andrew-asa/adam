import { PluginHandler } from "@/common/core/PluginHandler"
import { AdamPlugin } from "@/common/core/plugins"
import _ from "lodash"

export class AbstractPluginHandler implements PluginHandler {
    constructor() {
    }
    close(plugin: AdamPlugin, ext: any): void {
        // throw new Error("Method not implemented.")
    }
    needHandle(plugin: AdamPlugin): boolean {
        return false
    }
    open(plugin: AdamPlugin,ext?: any): void {
    }
}