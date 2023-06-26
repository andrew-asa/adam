import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { RubickPluginManager } from "./manager/RubickPluginManager";

export class CompositePluginManager implements ThirdPluginManager{
    private plugins: ThirdPlugin[] = [];
    private pms: ThirdPluginManager[] = []

    constructor() {
        this.pms.push(new RubickPluginManager({}));
    }

    install(plugin: ThirdPlugin): void {
        console.log(`install ${plugin.name}`);
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }

    listAllPlugin(): ThirdPlugin[] {
        return [];
    }
}