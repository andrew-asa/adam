import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { BrowserView, Session } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";
import { stores_name } from "@/main/common/common_const";
import { getStore } from "@/common/base/strore";

export class DefaultPluginRunner implements ThirdPluginRunner {

    getPreloads(plugin: ThirdPlugin): string[] {
        return this.getRunnerPreloads(plugin)
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return true
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session,
        view: BrowserView
    }): void {
        const main = this.getPluginMain(plugin)
        if (main) {
            let view = ext.view
            view.webContents.loadFile(main)
            view.webContents.once('dom-ready', () => {
                const ext: any = plugin.ext || {};
                view.webContents.openDevTools();
                this.triggerPluginHooks(view, 'PluginEnter', ext);
                this.triggerPluginHooks(view, 'PluginReady', ext);
            });
            //修复请求跨域问题
            view.webContents.session.webRequest.onBeforeSendHeaders(
                (details, callback) => {
                    callback({
                        requestHeaders: { referer: '*', ...details.requestHeaders },
                    });
                }
            );

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
    }

    unloadMain(plugin: ThirdPlugin, ext: {
        view: BrowserView
    }): void {
        this.triggerPluginHooks(ext.view, 'PluginOut', {});
        const mainWindow = getStore(stores_name.app_main_window)
        if (mainWindow) {
            const js = `ctx.app.search.pluginOut(${JSON.stringify(plugin)});`
            this.executeJavaScript(mainWindow.webContents, js, false);
        }
    }

    getPluginMain(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin.name, plugin.main)
    }


    getRunnerPreloads(plugin: ThirdPlugin): string[] {
        return [path.join(__dirname, '../preload/adam.js')]
    }

    triggerPluginHooks(view: BrowserView, hook: string, data: any) {
        if (!view) return;
        const s = `ctx.plugin.trigger("${hook}",${data ? JSON.stringify(data) : ''});`
        //     const evalJs = `
        //     if(window.ctx.plugin.trigger) {     
        //         try { 
        //             console.log('${s}');
        //             ctx.plugin.trigger("${hook}",${data ? JSON.stringify(data) : ''});
        //       } catch(e) {
        //         console.log(e);
        //       } 
        //     }
        //   `;
        //     view.webContents.executeJavaScript(evalJs);
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