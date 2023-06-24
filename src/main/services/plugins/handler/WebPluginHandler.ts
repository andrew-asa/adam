import { BrowserView, BrowserWindow, session } from "electron";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { is } from "@electron-toolkit/utils";
import { AdamPlugin } from "@/common/core/plugins";
import path from "path";
import { default_plugin_window_height, default_window_height, stores_name } from "@/main/common/common_const";
import { registerStore } from "@/main/common/strore";

export class WebPluginHandler extends DefaultPluginHandler {
    private view: BrowserView | null = null
    constructor() {
        super()
    }
    needHandle(plugin: AdamPlugin): boolean {
        return plugin.type === 'web'
    }
    open(plugin: AdamPlugin, { mainWindow }): void {
        console.log(`WebPluginHandler open: ${plugin.name}`);

        const { name, path } = plugin;
        const wm: BrowserWindow = mainWindow
        const view = this.createDefaultView(plugin)
        wm.addBrowserView(view);
        // view.webContents.openDevTools();
        const { width, height } = wm.getBounds()
        wm.setSize(width, default_window_height);
        this.loadUrl(view, plugin)
        //  dom-ready
        view.webContents.once('did-finish-load', () => {
            view.setBounds({ x: 0, y: default_window_height, width: width, height: default_plugin_window_height });
            wm.setSize(width, default_window_height + default_plugin_window_height);
            view.setAutoResize({ width: true });
        });
        this.view = view
        registerStore(stores_name.current_plugin_view, view)
    }

    close(plugin: AdamPlugin, { mainWindow }): void {
        console.log(`WebPluginHandler close: ${plugin.name}`);
        this.closeCurrentView()
        this.view = null
    }
    /**
     * 如果当前有打开的插件则进行关闭
     */


    loadUrl(view: BrowserView, plugin: AdamPlugin): void {
        // 内部模块
        if (plugin.path.startsWith("#")) {
            this.loadIndex(view)
            this.switchToInnerRouter(view, plugin)
        }
    }
    private switchToInnerRouter(view: BrowserView, plugin: AdamPlugin): void {
        const routerPath = plugin.path.substring(1)
        // 在页面加载完成后向 Vue 组件发送路由信息
        view.webContents.on('did-finish-load', () => {
            view.webContents.executeJavaScript(`ctx.services.switchToRoute('${routerPath}')`)
            // view.webContents.openDevTools()
        })
    }

    loadIndex(view: BrowserView): void {
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            const url = process.env['ELECTRON_RENDERER_URL']
            view.webContents.loadURL(url)
        } else {
            view.webContents.loadFile(path.join(__dirname, '../renderer/index.html'))
        }
    }

    createDefaultView(plugin: AdamPlugin): BrowserView {
        const { name, path } = plugin;
        const ses = session.fromPartition('<' + name + '>');
        return new BrowserView({
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true,
                webviewTag: true,
                //   preload,
                session: ses,
            },
        });
    }
}