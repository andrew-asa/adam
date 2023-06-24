import type TBrowserWindow from 'electron'
import { registerAction } from '@main/common/action'
import { actions_name } from '../common/common_const'
export function registerMainWindow(app: Electron.App, win: TBrowserWindow.BrowserWindow | null) {
    registerAction(actions_name.get_main_window, () => win)
};

export function registerApp(app: Electron.App) {
    registerAction('get-main-app', () => app)
}