import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { AdamPlugin, PluginSettings } from "@/common/core/plugins";

/**
 * electron 相关操作
 * @link src/main/services/plugins/PluginServices.ts
 */
export class PluginServices implements ServicesProvider {


    openPlugin(plugin: AdamPlugin, ext?: any) {
        return this.invoke("openPlugin", { plugin, ext })
    }

    closePlugin(plugin: AdamPlugin, ext?: any) {
        return this.invoke("closePlugin", { plugin, ext })
    }

    getPlugins() {
        return this.invoke("getPlugins", {})
    }

    getInstalledPlugins() {
        return this.invoke("getInstalledPlugins", {})
    }

    installPlugin(plugin: AdamPlugin, ext?: any) {
        return this.invoke("installPlugin", { plugin, ext })
    }
    /**
     * 获取插件设置
     */
    getPluginSettings(name: string) {
        return this.invoke("getPluginSettings", name)
    }

    /**
     * 更新插件设置
     */
    updatePluginSettings(name: string, settings: PluginSettings) {
        return this.invoke("updatePluginSettings", { name, settings })
    }

    resetPluginSettings(name: string) {
        return this.invoke("resetPluginSettings", name)
    }

    getPluginDefaultSettings(name: string) {
        return this.invoke("getPluginDefaultSettings", name)
    }

    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.plugin_services,
        });
    }
}
