import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { AdamPlugin, PluginSettings } from "@/common/core/plugins";
import { log } from "console";

/**
 * electron 相关操作
 * @link src/main/services/plugins/PluginServices.ts
 */
export class BasePluginServices implements ServicesProvider {

    setPluginReqHeaderReferer(options: {
        name: string,
        value: {
            urls: string[]
            referer: string
        }[]
    }) {
        this.invoke("setPluginReqHeaderReferer", options)
    }

    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.plugin_services,
        });
    }
}
