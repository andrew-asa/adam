import { ThirdPlugin, ThirdPluginManager, ThirdPluginRunner } from "@/common/core/plugins";
import { RubickPluginManager } from "./adapter/RubickPluginManager";
import { default_internal_plugin, default_plugin } from "./data/default_plugins";
import { RubickPluginRunner } from "./runner/RubickPluginRunner";
import { DefaultPluginRunner } from "./runner/DefaultPluginRunner";
import { PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { parseAppPlugin, parseInstallPlugin } from "./utils/plugin_utils";

export class CompositePluginManager implements ThirdPluginManager, ThirdPluginRunner {
    private plugins: ThirdPlugin[] = [];
    private pms: ThirdPluginManager[] = []
    private prs: ThirdPluginRunner[] = []
    private default_plugin_runner: ThirdPluginRunner = new DefaultPluginRunner();
    constructor() {
        this.init()
    }

    init(): void {
        this.pms.push(new RubickPluginManager({}));
        this.prs.push(new RubickPluginRunner());
        this.initPlugins();
    }

    initPlugins(): void {
        this.plugins.push(...default_internal_plugin);
        this.plugins.push(...default_plugin);
        const installPlugin: ThirdPlugin[] = parseInstallPlugin(PLUGINS_INSTALL_DIR)
        this.plugins.push(...installPlugin);
        const apps = parseAppPlugin();
        this.plugins.push(...apps);
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

    /**
     * 进入插件之前进行适配
     */
    loadMain(plugin: ThirdPlugin, ext: any): void {
        this.getThirdPluginRunner(plugin).loadMain(plugin, ext)
    }

    /**
     * 卸载页面
     */
    unloadMain(plugin: ThirdPlugin, ext: any): void {
        this.getThirdPluginRunner(plugin).unloadMain(plugin, ext)
    }

}