import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { AdamPlugin, PluginSettings } from "@/common/core/plugins";
import { log } from "console";

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
        // console.log("getPluginSettings", name)
        return this.invoke("getPluginSettings", name)
    }

    /**
     * 更新插件设置
     */
    updatePluginSettings(name: string, settings: PluginSettings) {
        // console.log("updatePluginSettings", name, settings)
        return this.invoke("updatePluginSettings", { name, settings })
    }

    resetPluginSettings(name: string) {
        return this.invoke("resetPluginSettings", name)
    }

    getPluginDefaultSettings(name: string) {
        // console.log("getPluginDefaultSettings", name)
        return this.invoke("getPluginDefaultSettings", name)
    }


    getCurrentViewsNames() {
        return this.invoke("getCurrentViewsNames", {})
    }

    openPluginConsole(name: string) {
        return this.invoke("openPluginConsole", name)
    }

    refreshPluginView(name: string) {
        return this.invoke("refreshPluginView", name)
    }
    /**
     * 插件窗口中运行脚本
     * name不指定就全部广播
     */
    executeJavaScriptOnPluginView(options: {
        script: string, name?: string
    }) {
        return this.invoke("executeJavaScriptOnPluginView", options)
    }

    /**
     * 插件输入变化
     */
    triggerPluginInputChange(options: {
        value: string,
        name?: string
    }) {
        this.invoke("triggerPluginInputChange", options)
    }
    /**
     * 插件按键改变
     */
    triggerPluginKeyDown(options: {
        keyCode: any,
        modifiers: any,
        name?: string
    }) {
        this.invoke("triggerPluginKeyDown", {
            name: options.name,
            value: {
                keyCode: options.keyCode,
                modifiers: options.modifiers
            }
        })
    }

    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.plugin_services,
        });
    }
}
