import { PluginContainerLifeCycle, ThirdPlugin } from "../core/plugins";
import { BaseAppController } from "./BaseAppController";

/**
 * 提供给插件使用的api
 */
export class PluginViewApi extends BaseAppController implements PluginContainerLifeCycle {
    from: string = "plugin_view";
    plugin: ThirdPlugin | null = null
    constructor() {
        super();
    }
    /**
     * 设置搜索框提示文件
     * @param text 
     * @example ctx.app.controller.setPlaceholder("回车搜索文件")
     */
    public setPlaceholder(text: String) {
        this.sendSyncMessage("setPlaceholder", text);
    }

    public loadPlugin(plugin: ThirdPlugin) {
        this.plugin = plugin
        console.log(`PluginViewApi loadPlugin ${plugin.name}`);
    }

    public unloadPlugin(plugin: ThirdPlugin) {
        console.log(`PluginViewApi unloadPlugin ${plugin.name}`);
        this.plugin = null
    }

    public getPluginMate(): ThirdPlugin | null {
        return this.plugin
    }
}