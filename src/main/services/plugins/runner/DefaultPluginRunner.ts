import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { BrowserView, Session, app } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";
import { stores_name } from "@/main/common/common_const";
import { getStore } from "@/common/base/store";
import { regs } from "@/common/common_const";
import _ from "lodash";
import { isTrueOrString } from "@/common/common_utils";

export class DefaultPluginRunner implements ThirdPluginRunner {

    getPreloads(plugin: ThirdPlugin): string[] {
        return this.getRunnerPreloads(plugin)
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return true
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session,
        view: BrowserView,
        options?: any
    }): void {
        this._loadMain(ext.view, plugin.name, plugin.main || '', ext.options || {})
    }

    async _loadMain(view: BrowserView, name: string, main: string, options?: any) {
        var fixMain = main
        const s = getStore(stores_name.services.plugin)
        const settings = await s.getPluginSettings(name)
        if (_.has(settings, 'debug') && isTrueOrString(settings.debug) && _.has(settings, 'main')) {
            console.log(`${name} debug in debug main url [${settings.main}]`)
            fixMain = settings.main
            if (_.has(settings, 'openConsoleOnCreate') && isTrueOrString(settings.openConsoleOnCreate)) {
                view.webContents.once('dom-ready', () => {
                    view.webContents.openDevTools({
                        mode: 'undocked',
                    })
                });
            }
        }

        if (fixMain.match(regs.http_or_https)) {
            view.webContents.loadURL(fixMain)
        } else {
            const fn = this.getPluginMain(name, fixMain)
            view.webContents.loadFile(fn)
        }
        this.addEnvent(view, name, options)
    }

    loadFile(path: string, view: BrowserView) {
        view.webContents.loadFile(path)
    }

    loadUrl(url: string, view: BrowserView) {
        view.webContents.loadURL(url)
    }

    addEnvent(view: BrowserView, pluginName: string, option?: any) {
        view.webContents.once('dom-ready', () => {
            // view.webContents.openDevTools();
            // this.triggerPluginHooks(view, 'PluginEnter', ext);
            // this.triggerPluginHooks(view, 'PluginReady', ext);
            this.notifierPluginLoad(view, pluginName, option || {});
            view.webContents.send('attach-preload', {
                webContentsId: view.webContents.id
            });

        });
        //修复请求跨域问题
        // view.webContents.session.webRequest.onBeforeSendHeaders(
        //     (details, callback) => {
        //         callback({
        //             requestHeaders: { referer: '*', ...details.requestHeaders },
        //         });
        //     }
        // );





        view.webContents.session.webRequest.onHeadersReceived(
            (details, callback) => {
                callback({
                    responseHeaders: {
                        'Access-Control-Allow-Origin': ['*'],
                        ...details.responseHeaders,
                    },
                });
            }
        );
    }


    unloadMain(plugin: ThirdPlugin, ext: {
        view: BrowserView
    }): void {
        this.notifierPluginUnLoad(ext.view, plugin.name);
        // this.triggerPluginHooks(ext.view, 'PluginOut', {});
        const mainWindow = getStore(stores_name.app_main_window)
        if (mainWindow) {
            const js = `ctx.app.search.pluginOut(${JSON.stringify(plugin)});`
            this.executeJavaScript(mainWindow.webContents, js, false);
        }
    }

    getPluginMain(name: string, main: string): string {
        return getPluginFilePath(name, main)
    }


    getRunnerPreloads(plugin: ThirdPlugin): string[] {
        const ret: string[] = [path.join(__dirname, '../preload/adam.js')]
        if (plugin.backendScript && !_.isEmpty(plugin.backendScript)) {
            ret.push(...plugin.backendScript.map(item => {
                return getPluginFilePath(plugin.name, item)
            }))
        }
        return ret
    }

    triggerPluginHooks(view: BrowserView, hook: string, data: any) {
        if (!view) return;
        const s = `ctx.plugin.trigger("${hook}",${data ? JSON.stringify(data) : ''});`
        this.executeJavaScript(view.webContents, s, true);
    }

    notifierPluginLoad(view: BrowserView, pluginName: string, options?: any) {
        if (!view) return;
        const s = `window.__internal__.plugin.loadPlugin("${pluginName}",${options ? JSON.stringify(options) : '{}'});`
        this.executeJavaScript(view.webContents, s, true);
    }

    notifierPluginUnLoad(view: BrowserView, pluginName: string, options?: any) {
        if (!view) return;
        const s = `window.__internal__.plugin.unloadPlugin("${pluginName}",${options ? JSON.stringify(options) : '{}'});`
        this.executeJavaScript(view.webContents, s, true);
    }

    executeJavaScript(contents, js: string, printjs = false): void {
        const evalJs = `
        try { 
            console.log('${printjs ? js : ''}');    
            ${js};
      } catch(e) {
        console.log(e);
      } 
        `
        contents.executeJavaScript(evalJs);
    }
}