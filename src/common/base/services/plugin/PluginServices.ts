import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { AdamPlugin } from "@/common/core/plugins";

/**
 * electron 相关操作
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

    installPlugin(plugin: AdamPlugin, ext?: any) {
        return this.invoke("installPlugin", { plugin, ext })
    }

    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.plugin_services,
        });
    }
}
