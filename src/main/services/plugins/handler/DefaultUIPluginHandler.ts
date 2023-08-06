import { ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { getStore, registerStore } from "@/common/base/store";
import { default_plugin_window_height, default_window_height, stores_name } from "@/main/common/common_const";
import { PluginHandler } from "@/common/core/PluginHandler";
import { BrowserView, BrowserWindow, Session, session } from "electron";
import { LRUCache } from "@/common/base/LRUCache";
import { setExpendHeight } from "../../contronler";
import { closeCachePage } from "@/common/plugin/plugin_meta_utils";

export class DefaultUIPluginHandler extends AbstractPluginHandler implements PluginHandler {
    view: BrowserView | undefined = undefined
    viewCache: LRUCache<string, BrowserView>
    constructor() {
        super()
        this.viewCache = new LRUCache<string, BrowserView>(10)
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return false
    }

    open(plugin: ThirdPlugin, options?: any) {
        let view = this.getOrCreateShowView(plugin, options)
        const mainWindow = getStore(stores_name.app_main_window)
        this.showView(view, mainWindow, plugin)
        return view
    }

    getOrCreateShowView(plugin: ThirdPlugin, options?: any): BrowserView {
        let view: BrowserView | undefined
        view = this.createDefaultView(plugin, options)
        return view
    }

    showView(view: BrowserView, mainWindow: BrowserWindow, plugin: ThirdPlugin): void {
        // mainWindow.addBrowserView(view);
        mainWindow.setBrowserView(view);
        view.webContents.once('dom-ready', () => {
            const width = this.getMainWindowWidth(mainWindow)
            view.setBounds({ x: 0, y: default_window_height, width: width, height: default_plugin_window_height });
            setExpendHeight({ height: default_plugin_window_height + default_window_height }, mainWindow)
            this.setCurrentView(view)
        })
    }

    setCurrentView(view: BrowserView | undefined): void {

        // console.log("setCurrentView")
        this.view = view
        registerStore(stores_name.current_plugin_view, view)
    }

    /**
     * @TODO
     * 是否是需要缓存插件
     */
    isCloseCachePagePlugin(plugin: ThirdPlugin): boolean {
        // const totalMetaData = getPluginManager().getPluginMate(plugin.name)
        // return closeCachePage(totalMetaData)
        return false

    }


    /**
     * 重置主窗口大小
     */
    resetMainWindowSize(mainWindow: BrowserWindow): void {
        setExpendHeight({ height: default_window_height }, mainWindow)
    }
    /**
     * 获取主窗口宽度
     */
    getMainWindowWidth(mainWindow: BrowserWindow): number {
        return mainWindow.getBounds().width
    }

    close(plugin: ThirdPlugin, options: any) {

        let view: BrowserView | undefined = options.view
        if (view) {
            const mainWindow = getStore(stores_name.app_main_window)
            this.removeShowView(view, plugin, mainWindow)
        }
    }

    getPreload(plugin: ThirdPlugin): string {
        return ""
    }

    customSession(plugin: ThirdPlugin, session: Session) {

    }

    createDefaultView(plugin: ThirdPlugin, options?: any): BrowserView {
        const { name } = plugin;
        const ses: Session = session.fromPartition('<' + name + '>');
        const preload = this.getPreload(plugin)
        this.customSession(plugin, ses)
        let webPreferences = {
            // enableRemoteModule: true,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            webviewTag: true,
            session: ses,
            cache: false
        }
        if (preload) {
            // @ts-ignore
            webPreferences.preload = preload
        }
        let view = new BrowserView({
            webPreferences: webPreferences,
        })
        this.loadMain(view, plugin, { session: ses })
        return view
    }

    removeShowView(view: BrowserView, plugin: ThirdPlugin, mainWindow: BrowserWindow): void {

        if (!view || !mainWindow) {
            return
        }
        this.unloadMain(view, plugin)
        this.resetMainWindowSize(mainWindow)
        mainWindow.removeBrowserView(view);
        try {
            //@ts-ignore
            view.webContents.destroy()
        } catch (e) {
            console.log(e)
        }
        this.setCurrentView(undefined)
    }

    loadMain(view: BrowserView, plugin: ThirdPlugin, {
        session: Session
    }): void {

    }

    unloadMain(view: BrowserView, plugin: ThirdPlugin): void {

    }
}