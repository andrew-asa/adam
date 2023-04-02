import { BrowserWindow, screen } from "electron";
import { getLocalDataFile, getUserDataDir } from "./app_configure_utils";
import { ElectronWindowStateManage } from "./electron_window_state_manage";
export const postion_file_path = getLocalDataFile('position.json')

export function windowPositionManager(win: BrowserWindow) {
    if (!win) return
    let mainWindowState = new ElectronWindowStateManage({
        file: 'window-state.json',
        path: getUserDataDir(),
    }, win)
    mainWindowState.manage(win)
    mainWindowState.loadState(win)
}