import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { Session } from "electron";

export class DefaultPluginRunner implements ThirdPluginRunner {

    needHandle(plugin: ThirdPlugin): boolean {
        return true
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session
    }): void {
        
    }
}