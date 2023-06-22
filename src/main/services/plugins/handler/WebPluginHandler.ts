import { BrowserView, BrowserWindow, session } from "electron";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { is } from "@electron-toolkit/utils";
import { AdamPlugin } from "@/common/core/plugins";
import path from "path";

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
        this.loadUrl(view, plugin)
        view.webContents.once('dom-ready', () => {
            view.setBounds({ x: 0, y: height, width: width, height: height + 600 });
            wm.setSize(width, height + 600);
            view.setAutoResize({ width: true });
        });
        this.view = view
    }

    close(plugin: AdamPlugin, { mainWindow }): void {
        console.log(`WebPluginHandler close: ${plugin.name}`);
        if (!this.view) {
            return
        }
        mainWindow.removeBrowserView(this.view);
        mainWindow.setSize(800, 60);
        this.view = null
    }

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