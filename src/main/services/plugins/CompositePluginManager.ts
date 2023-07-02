import { ThirdPlugin, ThirdPluginManager, ThirdPluginRunner } from "@/common/core/plugins";
import { RubickPluginManager } from "./adapter/RubickPluginManager";
import { default_plugin } from "./data/default_plugins";
import { RubickPluginRunner } from "./runner/RubickPluginRunner";
import { DefaultPluginRunner } from "./runner/DefaultPluginRunner";

export class CompositePluginManager implements ThirdPluginManager, ThirdPluginRunner {
    private plugins: ThirdPlugin[] = default_plugin;
    private pms: ThirdPluginManager[] = []
    private prs: ThirdPluginRunner[] = []
    private default_plugin_runner: ThirdPluginRunner = new DefaultPluginRunner();
    constructor() {
        this.pms.push(new RubickPluginManager({}));
        this.prs.push(new RubickPluginRunner());
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

    getThirdPluginRunner(plugin: ThirdPlugin): ThirdPluginRunner {
        const r = this.prs.find(p => p.needHandle(plugin))
        if (r === undefined) {
            return this.default_plugin_runner
        }
        return r
    }
    getPreloads(plugin: ThirdPlugin): string[] {
        return this.getThirdPluginRunner(plugin).getPreloads(plugin)
    }

    loadMain(plugin: ThirdPlugin, ext: any): void {
        this.getThirdPluginRunner(plugin).loadMain(plugin, ext)
    }
}