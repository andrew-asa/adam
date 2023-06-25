import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
/**
 * rubick插件管理器
 */
export class RubickPluginManager implements ThirdPluginManager {
    install(plugin: ThirdPlugin): void {
        console.log(`install ${plugin.name}`);
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }
}