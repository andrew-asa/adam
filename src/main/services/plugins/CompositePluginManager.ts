import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { RubickPluginManager } from "./adapter/RubickPluginManager";
import { default_plugin } from "./data/default_plugins";

export class CompositePluginManager implements ThirdPluginManager {
    private plugins: ThirdPlugin[] = default_plugin;
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
        return this.plugins;
    }

    /**
     * 获取插件信息
     */
    getPluginMate(name: string): ThirdPlugin | undefined {

        return this.plugins.find(p => p.name === name)
    }
}