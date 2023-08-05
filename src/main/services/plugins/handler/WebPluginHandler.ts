import { BrowserView } from "electron";
import { DefaultUIPluginHandler } from "./DefaultUIPluginHandler";
import { is } from "@electron-toolkit/utils";
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import path from "path";
import { regs } from "@/common/common_const";

export class WebPluginHandler extends DefaultUIPluginHandler {
    constructor() {
        super()
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return plugin.pluginType && plugin.pluginType.toLocaleLowerCase() === 'web'
    }

    open(plugin: ThirdPlugin, options?: any) {
        console.log(`WebPluginHandler open: ${plugin.name}|${plugin.pluginName}`);
        return super.open(plugin, options)
    }

    close(plugin: AdamPlugin, { mainWindow }) {
        console.log(`WebPluginHandler close: ${plugin.name}|${plugin.pluginName}`);
        return super.close(plugin, { mainWindow })
    }
    /**
     * 如果当前有打开的插件则进行关闭
     */
    loadMain(view: BrowserView, plugin: ThirdPlugin): void {
        let url = plugin.main || ''
        // 内部模块
        if (url.startsWith("#")) {
            this.loadIndex(view)
            this.switchToInnerRouter(view, plugin)
        } else if (url.match(regs.http_or_https)) {
            view.webContents.loadURL(url)
        }
    }
    private switchToInnerRouter(view: BrowserView, plugin: ThirdPlugin): void {
        if (plugin.main) {
            const routerPath = plugin.main.substring(1)
            // 在页面加载完成后向 Vue 组件发送路由信息
            view.webContents.on('did-finish-load', () => {
                view.webContents.executeJavaScript(`ctx.services.switchToRoute('${routerPath}')`)
                // view.webContents.openDevTools()
            })
        }
    }

    loadIndex(view: BrowserView): void {
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            const url = process.env['ELECTRON_RENDERER_URL']
            view.webContents.loadURL(url)
        } else {
            view.webContents.loadFile(path.join(__dirname, '../renderer/index.html'))
        }
    }
}