import {ThirdPlugin } from "@/common/core/plugins";
import { BaseAppController } from "./BaseAppController";

/**
 * 提供给插件使用的api
 */
export class PluginViewApi extends BaseAppController  {
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
        this.invoke("setPlaceholder", text);
    }
}