import { BrowserWindow, screen } from "electron";
import { getLocalDataFile, getUserDataDir } from "./app_configure_utils";
import { ElectronWindowStateManage } from "./electron_window_state_manage";
import path from "path";
import { is } from '@electron-toolkit/utils'
export const postion_file_path = getLocalDataFile('position.json')

export function windowStateManager(win: BrowserWindow) {
    if (!win) return
    let mainWindowState = new ElectronWindowStateManage({
        file: 'window-state.json',
        path: getUserDataDir(),
    }, win)
    mainWindowState.manage(win)
    mainWindowState.loadState(win)
    setShowPage(win)
}
function setShowPage(win) {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        const url = process.env['ELECTRON_RENDERER_URL'] + '/#/search'
        win.loadURL(url)
    } else {
        win.loadFile(path.join(__dirname, '../renderer/index.html'))
    }
    win.on('ready-to-show', () => {
        win.show()
    })
}