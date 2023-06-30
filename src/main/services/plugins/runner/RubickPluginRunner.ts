import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { Session } from "electron";

export class RubickPluginRunner implements ThirdPluginRunner {

    needHandle(plugin: ThirdPlugin): boolean {
        return (plugin && plugin.ext && plugin.ext.adapterEngine && plugin.ext.adapterEngine === "rubick") as boolean;
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session
    }): void {
        console.log(`RubickPluginRunner loadMain: ${plugin.name}`);
    }
}