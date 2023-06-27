import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { RubickPluginManager } from "./adapter/RubickPluginManager";

export class CompositePluginManager implements ThirdPluginManager{
    private plugins: ThirdPlugin[] = [];
    private pms: ThirdPluginManager[] = []

    constructor() {
        this.pms.push(new RubickPluginManager({}));
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return true
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