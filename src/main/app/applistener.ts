import type TBrowserWindow from 'electron'
import { registerAction } from '@main/common/action'
export function registerListener(app: Electron.App, win: TBrowserWindow.BrowserWindow | null) {
    registerAction('get-main-app', () => app)
    registerAction('get-main-widow', () => win)
};
