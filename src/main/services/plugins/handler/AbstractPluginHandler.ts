import { PluginHandler } from "@/common/core/PluginHandler"
import _ from "lodash"

export class AbstractPluginHandler implements PluginHandler {
    constructor() {
    }
    close(plugin: plugin, ext: any): void {
        // throw new Error("Method not implemented.")
    }
    needHandle(plugin: plugin): boolean {
        return false
    }
    open(plugin: plugin,ext: any): void {
    }
}