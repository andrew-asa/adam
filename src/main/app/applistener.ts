import type TBrowserWindow from 'electron'
import { registerAction } from '@main/common/action'
export function registerMainWindow(app: Electron.App, win: TBrowserWindow.BrowserWindow | null) {
    registerAction('get-main-window', () => win)
};

export function registerApp(app: Electron.App) {
    registerAction('get-main-app', () => app)
}