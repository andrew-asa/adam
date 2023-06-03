import { PluginHandler } from "@/common/core/PluginHandler"
import _ from "lodash"

export class AbstractPluginHandler implements PluginHandler {
    constructor() {
    }
    needHandle(plugin: plugin): boolean {
        return false
    }
    handle(plugin: plugin): void {
    }
}