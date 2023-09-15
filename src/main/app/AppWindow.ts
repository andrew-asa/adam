import { BrowserWindow, shell, screen } from "electron";

import { windowStateManager } from "@main/common/utils/electron_window_utils";
import path from "path";
import { actions_name, stores_name } from "../common/common_const";
import { WindowCreator } from "./type";
import { registerAction } from "@/common/base/action";
import { registerStore } from "@/common/base/store";

export class AppMainWindowCreator implements WindowCreator {
    private win: BrowserWindow | null = null;

    init() {
        this.createWindow()
    }
    getWindow() {
        return this.win
    }

    createWindow() {
        let win = this.createDefaultWindow()
        this.setWindow(win)
        this.regWindowListener(win)
        this.win = win
        registerStore(stores_name.app_main_window, win)
    }

    createDefaultWindow() {
        return new BrowserWindow({
            width: 800,
            height: 60,
            // 指定窗口的尺寸是否包括窗口边框。
            useContentSize: true,
            // 指定窗口是否可以调整大小。
            resizable: true,
            // 指定窗口是否显示边框和标题栏。
            frame: false,
            // 指定窗口是否在创建后立即显示。
            show: false,
            // 窗口的标题。
            title: 'adam',
            // 指定窗口是否在任务栏中显示。
            skipTaskbar: true,
            autoHideMenuBar: true,
            // alwaysOnTop: true,
            webPreferences: {
                // 指定是否启用 Web 安全性。
                webSecurity: false,
                // 指定是否启用远程模块。
                // enableRemoteModule: true,
                // 指定是否启用背景限制。
                backgroundThrottling: false,
                // 指定是否启用上下文隔离。
                contextIsolation: false,
                // 指定是否启用 webview 标签。
                webviewTag: true,
                // 设置nodeIntegration为true，允许在渲染进程中使用node.js的API
                nodeIntegration: true,
                // preload指定一个预加载的脚本，可以在渲染进程中使用node.js的API
                preload: path.join(__dirname, '../preload/index.js')
            }
        })
    }

    setWindow(win: BrowserWindow) {
        // 设置窗口是否可移动
        win.setMovable(true)
        // 设置窗口是否总在最前
        // win.setAlwaysOnTop(true, 'floating', 1)
        // 设置窗口打开链接的方式
        win.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })
        // 设置窗口显示的位置
        windowStateManager(win)
    }

    regWindowListener(win: BrowserWindow) {

        win.on("close", () => {
        })


        win.on("closed", () => {
            // @ts-ignore
            win = null;
            registerStore(stores_name.app_main_window, null)
            // registerAction(actions_name.get_main_window, () => win)
        });
        win.on("show", () => {
            console.log('show main window');
        })
    }
}


