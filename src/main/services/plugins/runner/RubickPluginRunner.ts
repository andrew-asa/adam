import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { BrowserView, Session } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";
import { RubickApiAdapter } from "./RubickApiAdater";
import { DefaultPluginRunner } from "./DefaultPluginRunner";

export class RubickPluginRunner extends DefaultPluginRunner {
    apiAdapeter: RubickApiAdapter
    constructor() {
        super();
        this.apiAdapeter = new RubickApiAdapter()
    }
    getPreloads(plugin: ThirdPlugin): string[] {
        return [path.join(__dirname, '../preload/rubick.js')]
    }
    private plugins_dir = path.join(PLUGINS_INSTALL_DIR, "./node_modules/");
    needHandle(plugin: ThirdPlugin): boolean {
        return (plugin && plugin.ext && plugin.ext.adapterEngine && plugin.ext.adapterEngine === "rubick") as boolean;
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session,
        view: BrowserView
    }): void {
        let view = ext.view
        let session= ext.session
        const main = this.getPluginMain(plugin)
        if (main) {
            // view.webContents.loadURL(`file://${main}`)
            view.webContents.loadFile(main)
        }
        view.webContents.once('dom-ready', () => {
            const ext: any = plugin.ext || {};
            view.webContents.openDevTools();
            this.executeHooks(view, 'PluginEnter', ext);
            this.executeHooks(view, 'PluginReady', ext);
        });
        //修复请求跨域问题
        // view.webContents.session.webRequest.onBeforeSendHeaders(
        //     (details, callback) => {
        //         callback({
        //             requestHeaders: { referer: '*', ...details.requestHeaders },
        //         });
        //     }
        // );

        // view.webContents.session.webRequest.onHeadersReceived(
        //     (details, callback) => {
        //         callback({
        //             responseHeaders: {
        //                 'Access-Control-Allow-Origin': ['*'],
        //                 ...details.responseHeaders,
        //             },
        //         });
        //     }
        // );
    }

    

    executeHooks(view: BrowserView, hook: string, data: any) {
        if (!view) return;
        const evalJs = `
        console.log('executeHooks hook ${hook} data: ${JSON.stringify(data)}');
        if(window.rubick && window.rubick.hooks && typeof window.rubick.hooks.on${hook} === 'function' ) {     
          try { 
            window.rubick.hooks.on${hook}(${data ? JSON.stringify(data) : ''});
          } catch(e) {} 
        }
      `;
        view.webContents.executeJavaScript(evalJs);
    }
}