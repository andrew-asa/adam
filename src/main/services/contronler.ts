import { BrowserView, shell } from "electron";
import { CONFIGURE_DIR, isMacOS, stores_name } from "@main/common/common_const";
import { is } from "@electron-toolkit/utils";
import path from "path";

/**
 * 打开控制台
 */
export function openConsole() {
    const win = getStore(stores_name.app_main_window)
    win && win.webContents.openDevTools(
        {
            mode: 'undocked'
        }
    )
}
/**
 * 当前插件控制台
 */
export function openCurrentPluginConsole() {
    const win = getStore(stores_name.current_plugin_view)
    win && win.webContents.openDevTools({
        mode: 'undocked'
    })
}

export function show() {
    const win = getStore(stores_name.app_main_window)
    if (win) {
        win.show()
    }
}

export function removeAllPluginView() {
    const win: BrowserWindow = getStore(stores_name.app_main_window)
    if (win) {
        const views: BrowserView[] = win.getBrowserViews()
        for (const view of views) {
            win.removeBrowserView(view)
        }
    }
}

export function hide() {
    hideMainWin()
}
/**
 * @Author andrew
 * @Description 显示主窗口
 * @Date 2023-03-25 12:09:48
 */
export function showMainWin() {
    const win = getStore(stores_name.app_main_window)
    if (win) {
        let app = getStore(stores_name.main_app)
        if (isMacOS) {
            app && app.dock.show()
            //  win.setVisibleOnAllWorkspaces(true)
        }
        win.setSkipTaskbar(false)
        win.show()
        // win.focus()
    } else {
        // 创建窗口
        let app = getStore(stores_name.app)
        if (app) {
            app.createWindow()
        }
    }
}

/**
 * @Author andrew
 * @description 隐藏
 */
export function hideMainWin() {
    let win = getStore(stores_name.app_main_window)
    if (win) {
        win.hide()
        win.setSkipTaskbar(true)
        isMacOS && getStore(stores_name.main_app)?.dock.hide()
    }
}

/**
 * @Author andrew
 * @Description 退出程序
 * @Date 2023-03-25 12:15:51
 */
export function quit() {
    const app = getStore(stores_name.main_app)
    app && app.quit()
}
/**
 * @Author andrew
 * @deprecated 退出程序
 */
export function exit() {
    const app = getStore(stores_name.main_app)
    app && app.exit(-1)
}

/**
 * @Author andrew
 * @Description 重新启动
 * @Date 2023-03-25 12:16:59
 */
export function relaunch() {
    const app = getStore(stores_name.main_app)
    if (app) {
        app.relaunch()
        app.exit(1)
    }
}


/**
 * 浏览器中打开
 * @Author andrew
 * @Description
 * @Date 2023-03-28 07:57:45
 */
export function openInBrowser() {
    let url = process.env['ELECTRON_RENDERER_URL'] || ""
    // console.log(url);
    shell.openExternal(url)
}

/**
 * 打开用户目录
 */
export function openUserHome() {
    openFile(CONFIGURE_DIR)
}


/**
 * @Author andrew
 * @Description 取消/打开 悬浮小球
 * @Date 2023-03-28 16:50:30
 */
export function toggleBall() {

}

/**
 * 浏览器前进
 */
export function forward() {
    let win = getStore(stores_name.app_main_window)
    win && win.webContents.goForward()
}

/**
 * 浏览器后退
 */
export function back() {
    let win = getStore(stores_name.app_main_window)
    win && win.webContents.goBack()
}

/**
 * 刷新
 */
export function refresh() {
    let win = getStore(stores_name.app_main_window)
    win && win.webContents.reload()
}
/**
 * 显示主页
 */
export function home() {
    console.log('home');
    let win = getStore(stores_name.app_main_window)
    if (!win) {
        return
    }
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        // console.log(`setWindow ${process.env['ELECTRON_RENDERER_URL']}`);
        win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
}
/**
 * @Author andrew
 * 设置窗口大小
 */
export function setWindowSize({ width, height }, win) {
    // console.log(`setWindowSize ${width} ${height}`);
    if (!win) {
        win = getStore(stores_name.app_main_window)
    }
    win && win?.setSize(width, height)
}
/**
 * 设置扩展高度
 */
export function setExpendHeight({ height }, win) {
    // console.log(`setExpendHeight  ${height}`);
    if (!win) {
        win = getStore(stores_name.app_main_window)
    }
    if (win) {
        let size = win.getSize()
        win.setSize(size[0], height)
    }
}

/**
 * 打开插件
 */
import { openPlugin as op, closePlugin as cl } from "@/main/services/plugins/handlers";
import { getStore } from "../../common/base/strore";
import { openFile } from "./appsearch";
import { CompositePluginManager } from "./plugins/CompositePluginManager";
import { BrowserWindow } from "electron/main";
/**
 * 
 * 打开插件
 */
export function openPlugin({ plugin, ext }) {
    op(plugin, ext)
}
/**
 * 关闭插件
 */
export function closePlugin({ plugin }) {
    cl(plugin)
}

/**
 * 获取所有插件
 */
export function getPlugins() {
    return getPluginManager().listAllPlugin()
}


const pluginManager: CompositePluginManager = new CompositePluginManager()
/**
 * 安装插件
 */
export function installPlugin({ plugin }) {
    pluginManager.install(plugin)
}

/**
 * 获取插件管理器
 */
export function getPluginManager(): CompositePluginManager {
    return pluginManager
}

