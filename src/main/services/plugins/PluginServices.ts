import { AdamPlugin } from "@/common/core/plugins";
import { ServicesProvider } from "@/common/core/types";
import { PluginHandler } from "@/common/core/PluginHandler";
import { SystemAppHandler } from "./handler/SystemAppHandler";
import { CodePluginHandler } from "./handler/CodePluginHandler";
import { WebPluginHandler } from "./handler/WebPluginHandler";
import { UIPluginHandler } from "./handler/UIPluginHandler";
import { InternalPluginHandler } from "./handler/InternalPluginHandler";
import { DefaultUIPluginHandler } from "./handler/DefaultUIPluginHandler";
import _ from "lodash";
import { getStore } from "@/common/base/strore";
import { stores_name } from "@/main/common/common_const";
import { CompositePluginManager } from "./CompositePluginManager";
export class PluginServices implements ServicesProvider {
    handlers: PluginHandler[] = [];
    DH: PluginHandler = new DefaultUIPluginHandler();
    pluginManager: CompositePluginManager = new CompositePluginManager()
    constructor() {
        this.init();
    }

    init() {
        console.log(`PluginServices init`);
        this.initHandlers();
    }

    initHandlers() {
        this.handlers = [
            new SystemAppHandler(),
            new CodePluginHandler(),
            new WebPluginHandler(),
            new UIPluginHandler(),
            new InternalPluginHandler(),
        ];
    }

    addHandler(handler: PluginHandler) {
        this.handlers.push(handler);
    }
    addHandlers(handlers: PluginHandler[]) {
        this.handlers.forEach(h => this.addHandler(h));
    }

    getHandler(plugin: AdamPlugin): PluginHandler {
        return _.find(this.handlers, h => h.needHandle(plugin)) || this.DH;
    }

    getHandlers(): PluginHandler[] {
        return this.handlers;
    }

    openPlugin({ plugin, ext }) {
        console.log(`PluginServices openPlugin ${plugin.name}`)
        this.getHandler(plugin).open(plugin, { mainWindow: getStore(stores_name.app_main_window) })
        return "success"
    }

    closePlugin({ plugin, ext }) {
        console.log(`PluginServices closePlugin ${plugin.name}`)
        this.getHandler(plugin).close(plugin, { mainWindow: getStore(stores_name.app_main_window) })
        return "success"
    }

    getPlugins(): AdamPlugin[] {
        return this.pluginManager.listAllPlugin()
    }

    installPlugin({ plugin }) {
        this.pluginManager.install(plugin)
    }

    getPluginManager() {
        return this.pluginManager
    }
}