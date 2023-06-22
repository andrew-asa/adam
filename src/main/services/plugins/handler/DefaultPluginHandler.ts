import { AdamPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";

export class DefaultPluginHandler extends AbstractPluginHandler{
    needHandle(plugin: AdamPlugin): boolean {
        return true
    }
}