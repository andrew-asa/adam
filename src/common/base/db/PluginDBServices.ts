import { PluginContainerLifeCycle, ThirdPlugin } from "../../core/plugins";
import { BaseDBServices } from "./BaseDBServices";

export class PluginDBServices extends BaseDBServices implements PluginContainerLifeCycle {
    pluginName: string = "";
    constructor() {
        super();
    }
    loadPlugin(plugin: ThirdPlugin) {
        this.pluginName = plugin.name
    }
    unloadPlugin(plugin: ThirdPlugin) {
        this.pluginName = null
    }


    getPluginName(): string {
        if (this.pluginName) {
            return this.pluginName
        }
        throw new Error("plugin state is null")
    }
}