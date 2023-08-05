import { getStore } from "@/common/base/store";
import { ThirdPlugin } from "@/common/core/plugins";
import { DefaultPluginHandler } from "./plugins/handler/DefaultPluginHandler";
import { ServicesProvider } from "@/common/core/types";
import { PluginHandler } from "@/common/core/PluginHandler";
import { export_stores_name } from "@/common/common_const";
import { SystemAppHandler } from "./plugins/handler/SystemAppHandler";
import { CodePluginHandler } from "./plugins/handler/CodePluginHandler";
import { UIPluginHandler } from "./plugins/handler/UIPluginHandler";
import { WebPluginHandler } from "./plugins/handler/WebPluginHandler";
import { InternalPluginHandler } from "./plugins/handler/InternalPluginHandler";
import _ from "lodash";
/**
 * @description 前端操作接口
 */
export class SearchController implements ServicesProvider {
    handlers: PluginHandler[] = [];
    DH: PluginHandler = new DefaultPluginHandler();
    constructor() {
        this.initDefaultHandlers();
    }

    private initDefaultHandlers() {
        this.addHandlers(
            [
                new SystemAppHandler(),
                new CodePluginHandler(),
                new WebPluginHandler(),
                new InternalPluginHandler(),
                new UIPluginHandler(),
            ]);
    }

    addHandler(handler: PluginHandler) {
        this.handlers.push(handler);
    }
    addHandlers(handlers: PluginHandler[]) {
        handlers.forEach(h => this.addHandler(h));
    }


    getHandler(plugin: ThirdPlugin): PluginHandler {
        return _.find(this.handlers, h => h.needHandle(plugin)) || this.DH;
    }

    pluginOut(plugin: ThirdPlugin) {
        this.getStore().resetPlaceholder();
    }

    setPlaceholder(placeholder: string) {
        this.getStore().setPlaceholder(placeholder);

    }

    getStore() {
        return getStore(export_stores_name.renderer.plugin_stores);
    }

    /**
     * 打开插件 
     */
    open(plugin: ThirdPlugin, options?: { playload?: string }) {
        this.getHandler(plugin).open(plugin, options)
    }


    /**
     * 关闭插件
     */
    close(plugin: ThirdPlugin, options?: any) {
        this.getHandler(plugin).close(plugin, options)
    }
}