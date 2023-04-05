import { BrowserWindow, shell, screen } from "electron";
import path from "path";

import { is } from '@electron-toolkit/utils'
import { registerAction } from "@main/common/action";
import { windowPositionManager } from "@main/common/utils/electron_window_utils";
let win: BrowserWindow | null = null;
export const init = () => {
    createWindow()
}

function regWindowListener(win: BrowserWindow) {

    win.on("close", () => {
    })

    win.on("closed", () => {
        // @ts-ignore
        win = null;
        registerAction('get-main-window', () => win)
    });

    win.on("show", () => {
        // win.webContents.executeJavaScript(
        //     `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onShow === "function" && window.rubick.hooks.onShow()`
        // );
        // win.show()
    })
    win.on('ready-to-show', () => {

        win.show()
    })


    win.on("hide", () => {
        // win.webContents.executeJavaScript(
        //     `window.rubick && window.rubick.hooks && typeof window.rubick.hooks.onHide === "function" && window.rubick.hooks.onHide()`
        // );
    });

    // 判断失焦是否隐藏
    win.on("blur", () => {
        // const config = { ...global.OP_CONFIG.get() };
        // if (config.perf.common.hideOnBlur) {
        //     win.hide();
        // }
    });

}
function _debugListener(win: BrowserWindow) {
    "close,closed,show,ready-to-show,hide,blur".split(',').forEach(e => {
        // @ts-ignore
        win?.on(e, () => {
            console.log('window ' + e)
        })
    })
}
function setWindow(win: BrowserWindow) {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
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
    windowPositionManager(win)
}

function createDefaultWindow() {
    return new BrowserWindow({
        // width: 900,
        // height: 670,
        // 指定窗口的尺寸是否包括窗口边框。
        // useContentSize: true,
        // 指定窗口是否可以调整大小。
        resizable: true,
        // 指定窗口是否显示边框和标题栏。
        // frame: false,
        // 指定窗口是否在创建后立即显示。
        show: false,
        // 窗口的标题。
        title: 'adam',
        // 指定窗口是否在任务栏中显示。
        skipTaskbar: true,
        // autoHideMenuBar: true,
        alwaysOnTop: true,
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
function createWindow(): void {
    win = createDefaultWindow();
    setWindow(win)
    regWindowListener(win)
}

export const getWindow = () => {
    return win;
}
