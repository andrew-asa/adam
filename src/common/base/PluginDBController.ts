import { PluginContainerLifeCycle, ThirdPlugin } from "../core/plugins";
import { BaseDBController } from "./BaseDBController";

export class PluginDBController extends BaseDBController implements PluginContainerLifeCycle {
    constructor() {
        super();
    }
    loadPlugin(plugin: ThirdPlugin) {

    }
    unloadPlugin(plugin: ThirdPlugin) {

    }

    put(data: any) {
        
    }
}