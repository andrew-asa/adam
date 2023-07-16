import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { BrowserView, Session } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";

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
                this.triggerHooks(view, 'PluginEnter', ext);
                this.triggerHooks(view, 'PluginReady', ext);
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
        this.triggerHooks(ext.view, 'PluginOut', {});
    }

    getPluginMain(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin.name, plugin.main)
    }


    getRunnerPreloads(plugin: ThirdPlugin): string[] {
        return [path.join(__dirname, '../preload/adam.js')]
    }

    triggerHooks(view: BrowserView, hook: string, data: any) {
        if (!view) return;
        const s = `ctx.plugin.trigger("${hook}",${data ? JSON.stringify(data) : ''});`
        const evalJs = `
        if(window.ctx.plugin.trigger) {     
            try { 
                console.log('${s}');
                ctx.plugin.trigger("${hook}",${data ? JSON.stringify(data) : ''});
          } catch(e) {
            console.log(e);
          } 
        }
      `;
        view.webContents.executeJavaScript(evalJs);
    }
}