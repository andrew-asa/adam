import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
export class WebPluginHandler implements ThirdPluginManager {
    install(plugin: ThirdPlugin): void {
        console.log(`install ${plugin.name}`);
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }

}