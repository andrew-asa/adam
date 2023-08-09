import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { AdamPlugin, PluginSettings } from "@/common/core/plugins";
import { log } from "console";
import { BaseServices } from "../BaseServices";

/**
 * electron 相关操作
 * @link src/main/services/plugins/PluginServices.ts
 */
export class BasePluginServices extends BaseServices {
    serviceName: string = services_name.plugin_services;
    setPluginReqHeaderReferer(options: {
        name: string,
        value: {
            urls: string[]
            referer: string
        }[]
    }) {
        this.invoke("setPluginReqHeaderReferer", options)
    }
}
