import { ThirdPlugin } from "@/common/core/plugins";
import { AbstractPluginHandler } from "./AbstractPluginHandler";
import { registerStore } from "@/main/common/strore";
import { default_plugin_window_height, default_window_height, stores_name } from "@/main/common/common_const";
import { PluginHandler } from "@/common/core/PluginHandler";
import { BrowserView, BrowserWindow, Session, session } from "electron";
import { LRUCache } from "@/common/base/LRUCache";
import { getPluginManager, setExpendHeight } from "../../contronler";
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

    open(plugin: ThirdPlugin, { mainWindow }): void {
        let view = this.getOrCreateShowView(plugin)
        this.showView(view, mainWindow)
    }

    getOrCreateShowView(plugin: ThirdPlugin): BrowserView {
        let view: BrowserView | undefined
        if (this.isCloseCachePagePlugin(plugin)) {
            view = this.viewCache.get(plugin.name)
            if (!view) {
                view = this.createDefaultView(plugin)
                this.viewCache.set(plugin.name, view)
            }
        } else {
            view = this.createDefaultView(plugin)
        }
        return view
    }

    showView(view: BrowserView, mainWindow: BrowserWindow): void {
        mainWindow.addBrowserView(view);
        const width = this.getMainWindowWidth(mainWindow)
        view.setBounds({ x: 0, y: default_window_height, width: width, height: default_plugin_window_height });
        setExpendHeight({ height: default_plugin_window_height + default_window_height }, mainWindow)
        this.setCurrentView(view)
    }

    setCurrentView(view: BrowserView | undefined): void {
        this.view = view
        registerStore(stores_name.current_plugin_view, view)
    }

    /**
     * 是否是需要缓存插件
     */
    isCloseCachePagePlugin(plugin: ThirdPlugin): boolean {
        const totalMetaData = getPluginManager().getPluginMate(plugin.name)
        return closeCachePage(totalMetaData)
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

    close(plugin: ThirdPlugin, { mainWindow }): void {
        let destroy = true
        let view: BrowserView | undefined = undefined
        if (this.isCloseCachePagePlugin(plugin)) {
            view = this.viewCache.get(plugin.name)
            if (view) {
                destroy = false
            }
        } else {
            view = this.view
        }
        if (view) {
            this.removeShowView(view, mainWindow, destroy)
        }
    }

    createDefaultView(plugin: ThirdPlugin): BrowserView {
        const { name } = plugin;
        const ses:Session = session.fromPartition('<' + name + '>');
        let view = new BrowserView({
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
        this.loadMain(view, plugin, { session: ses })
        return view
    }

    removeShowView(view: BrowserView, mainWindow: BrowserWindow, destroy = true): void {

        if (!view || !mainWindow) {
            return
        }
        this.resetMainWindowSize(mainWindow)
        mainWindow.removeBrowserView(view);
        if (destroy) {
            try {
                //@ts-ignore
                view.webContents.destroy()
            } catch (e) {
                console.log(e)
            }
        }
        this.setCurrentView(undefined)
    }

    loadMain(view: BrowserView, plugin: ThirdPlugin, {
        session:Session
    }): void {

    }
}