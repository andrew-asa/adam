import { BrowserView, BrowserWindow, session } from "electron";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { is } from "@electron-toolkit/utils";

export class WebPluginHandler extends DefaultPluginHandler {
    private view: BrowserView | null = null
    constructor() {
        super()
    }
    needHandle(plugin: plugin): boolean {
        return plugin.type === 'web'
    }
    open(plugin: plugin, { mainWindow }): void {
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

    close(plugin: plugin, { mainWindow }): void {
        console.log(`WebPluginHandler close: ${plugin.name}`);
        if (!this.view) {
            return
        }
        mainWindow.removeBrowserView(this.view);
        mainWindow.setSize(800, 60);
        this.view = null
    }

    loadUrl(view: BrowserView, plugin: plugin): void {
        const { name, path } = plugin;
        // 内部模块
        if (path.startsWith("#")) {
            var url = process.env['ELECTRON_RENDERER_URL'] + path
            view.webContents.loadURL(url)
        }
    }

    createDefaultView(plugin: plugin): BrowserView {
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