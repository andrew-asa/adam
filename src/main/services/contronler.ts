import { shell } from "electron";
import { getAction } from "@main/common/action";
import { isMacOS } from "@main/common/common_const";

/**
 * 打开控制台
 */
export function openConsole() {
    const win = getAction('get-main-window')()
    win && win.webContents.openDevTools()
}

/**
 * @Author andrew
 * @Description 显示主窗口
 * @Date 2023-03-25 12:09:48
 */
export function showMainWin() {
    const win = getAction('get-main-window')()
    if (win) {
        let app = getAction('get-main-app')()
        if (isMacOS) {
            app && app.dock.show()
            //  win.setVisibleOnAllWorkspaces(true)
        }
        win.setSkipTaskbar(false)
        win.show()
        // win.focus()

    } else {
        // 创建窗口
        let app = getAction('get-app')()
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
    let win = getAction('get-main-window')()
    if (win) {
        win.hide()
        win.setSkipTaskbar(true)
        isMacOS && getAction('get-main-app')()?.dock.hide()
    }
}

/**
 * @Author andrew
 * @Description 退出程序
 * @Date 2023-03-25 12:15:51
 */
export function quit() {
    const app = getAction('get-main-app')()
    app && app.quit()
}
/**
 * @Author andrew
 * @deprecated 退出程序
 */
export function exit() {
    const app = getAction('get-main-app')()
    app && app.exit(-1)
}

/**
 * @Author andrew
 * @Description 重新启动
 * @Date 2023-03-25 12:16:59
 */
export function relaunch() {
    const app = getAction('get-main-app')()
    if (app) {
        app.relaunch()
        app.exit(1)
    }
}


/**
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
 * @Author andrew
 * @Description 取消/打开 悬浮小球
 * @Date 2023-03-28 16:50:30
 */
export function toggleBall() {

}