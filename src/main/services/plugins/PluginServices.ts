import { AdamPlugin, PluginSettings, ThirdPlugin } from "@/common/core/plugins";
import { ServicesProvider } from "@/common/core/types";
import { PluginHandler } from "@/common/core/PluginHandler";
import { SystemAppHandler } from "./handler/SystemAppHandler";
import { CodePluginHandler } from "./handler/CodePluginHandler";
import { WebPluginHandler } from "./handler/WebPluginHandler";
import { UIPluginHandler } from "./handler/UIPluginHandler";
import { InternalPluginHandler } from "./handler/InternalPluginHandler";
import { DefaultUIPluginHandler } from "./handler/DefaultUIPluginHandler";
import _ from "lodash";
import { getStore } from "@/common/base/store";
import { stores_name } from "@/main/common/common_const";
import { CompositePluginManager } from "./CompositePluginManager";
import { DBServices } from "../db/DBServices";
import { DECODE_KEY, db_prefix } from "@/common/common_const";
import { BrowserView } from "electron";
import { LRUCache } from "@/common/base/LRUCache";
export class PluginServices implements ServicesProvider {
    handlers: PluginHandler[] = [];
    DH: PluginHandler = new DefaultUIPluginHandler();
    pluginManager: CompositePluginManager = new CompositePluginManager()
    views: Map<string, BrowserView> = new Map();
    settingsCache: LRUCache<string, PluginSettings> = new LRUCache<string, PluginSettings>(10);
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
        const ret = this.getHandler(plugin).open(plugin, ext)
        if (ret && ret instanceof BrowserView) {
            this.views.set(plugin.name, ret)
        }
        return "success"
    }

    getViewByName(name: string) {
        return this.views.get(name)
    }

    closePlugin({ plugin, ext }) {
        console.log(`PluginServices closePlugin ${plugin.name}`)
        const options = {
            view: this.getViewByName(plugin.name),
            ext: ext
        }
        this.getHandler(plugin).close(plugin, options)
        this.views.delete(plugin.name)
        return "success"
    }

    getPlugins(): AdamPlugin[] {
        return this.pluginManager.listAllPlugin()
    }

    getInstalledPlugins(): AdamPlugin[] {
        return this.pluginManager.listInstalledPlugin()
    }

    installPlugin({ plugin }) {
        this.pluginManager.install(plugin)
    }

    getPluginManager() {
        return this.pluginManager
    }
    /**
     * 根据插件名字获取插件元信息
     */
    getPluginMateByName(name: string): ThirdPlugin | undefined {
        return this.pluginManager.getPluginMate(name)
    }
    /**
     * 获取用户当前插件的配置
     */
    async getPluginSettings(name: string) {
        const db: DBServices = getStore(stores_name.services.db)
        var ret: any = {}
        if (this.settingsCache.has(name)) {
            ret = this.settingsCache.get(name)
        } else {
            const dbr = await db.get({
                name: name,
                prefix: this.getPluginSettiingsPrefix(),
            })
            if (_.isEmpty(dbr.data)) {
                ret = this.getPluginMateByName(name)?.settings || {}
                // if(!_.isEmpty(ret)) {
                //     this.resetPluginSettings(name)
                // }
            } else {
                ret = dbr.data
            }
        }
        return ret
    }
    /**
     * 获取默认配置
     */
    getPluginDefaultSettings(name: string) {
        return this.getPluginMateByName(name)?.settings || {}
    }
    /**
     * 更新插件设置
     */
    updatePluginSettings({ name, settings }) {
        const db: DBServices = getStore(stores_name.services.db)
        return db.put({
            name: name,
            doc: settings,
            prefix: this.getPluginSettiingsPrefix(),
        })
    }
    /**
     * 重置配置
     */
    async resetPluginSettings(name: string) {
        const db: DBServices = getStore(stores_name.services.db)
        const setting = this.getPluginMateByName(name)?.settings || {}
        await db.put({
            name: name,
            doc: setting,
            prefix: this.getPluginSettiingsPrefix(),
        })
        return setting
    }

    getPluginSettiingsPrefix(): string[] {
        return [db_prefix.plugin_settins];
    }

    addView(name: string, view: BrowserView) {
        this.views.set(name, view);
    }

    removeView(name: string) {
        this.views.delete(name);
    }

    /**
     * 获取当前存在页面的所有插件名字
     */
    getCurrentViewsNames(): string[] {
        return [...this.views.keys()];
    }

    /**
     * 打开指定插件控制台
     */
    openPluginConsole(name: string) {
        const view = this.getViewByName(name)
        if (view) {
            view.webContents.openDevTools({
                mode: 'undocked'
            })
        }
    }

    /**
     * 刷新插件页面
     */
    refreshPluginView(name: string) {
        const view = this.getViewByName(name)
        if (view) {
            view.webContents.reload()
        }
    }

    /**
     * 在插件页面执行脚本
     */
    executeJavaScriptOnPluginView(options: {
        name?: string,
        script: string,
    }) {
        if (options.name) {
            const view = this.getViewByName(options.name)
            if (view) {
                view.webContents.executeJavaScript(options.script)
            }
        } else {
            // 全部插件都执行一遍
            this.views.forEach(view => view.webContents.executeJavaScript(options.script))
        }
    }


    private executeJscriptOnPluginView(view: BrowserView, script: string) {
        view.webContents.executeJavaScript(script)
    }

    triggerPluginInputChange(optins: {
        name?: string,
        value: string
    }) {
        // console.log("currentPluginInputChange", value)
        this.triggerPluginViewAction({
            name: optins.name,
            hook: 'inputChange',
            data: { text: optins.value }
        })
    }


    triggerPluginKeyDown(options: {
        name?: string,
        value: {
            modifiers: any,
            keyCode: any
        }
    }) {
        const code = DECODE_KEY[options.value.keyCode];
        this.triggerPluginViewAction({
            name: options.name,
            hook: 'keydown',
            data: code
        })
    }

    triggerPluginViewAction(options: {
        name?: string,
        hook: string,
        data: any
    }) {

        this.executeJavaScriptOnPluginView({
            name: options.name,
            script: `ctx.plugin.trigger("${options.hook}",${options.data ? JSON.stringify(options.data) : ''});`
        })
    }
}