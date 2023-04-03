import { optimizer } from '@electron-toolkit/utils';
import electron, { app, BrowserWindow, globalShortcut } from 'electron';
import { isDev, isMacOS, isProduction } from '@main/common/common_const';
import { registerMainWindow } from './applistener';
import * as main from './AppWindow'

import createTray from './menus/tray';
import renderer_api from '@main/services/renderer_api';
import { setupApp } from './startup/startup';
export class App {
    public windowCreator: { init: () => void; getWindow: () => BrowserWindow | null };
    private systemPlugins: any;
    constructor() {
        // 
        this.windowCreator = main
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            app.quit();
        } else {
            // this.systemPlugins = registerySystemPlugin();
            this.beforeReady();
            this.onReady();
            this.onRunning();
            this.onQuit();
            "activate,ready,second-instance,browser-window-created,window-all-closed,will-quit,before-quit".split(',').forEach(e => {
                //@ts-ignore
                app?.on(e, () => {
                    console.log('app ' + e)
                })
            })
        }
    }
    beforeReady() {
        // 系统托盘
        if (isMacOS) {
            if (isProduction && !app.isInApplicationsFolder()) {
                app.moveToApplicationsFolder();
            } else {
                app.dock.hide();
            }
        } else {
            app.disableHardwareAcceleration();
        }
    }
    createWindow() {
        this.windowCreator.init();
        registerMainWindow(app, this.windowCreator.getWindow())
    }
    onReady() {
        const readyFunction = () => {
            this.createWindow();
            // const mainWindow = this.windowCreator.getWindow();
            // API.init(mainWindow);
            setupApp(app);

            // registerHotKey(this.windowCreator.getWindow());
            // this.systemPlugins.triggerReadyHooks(
            //     Object.assign(electron, { mainWindow: this.windowCreator.getWindow() })
            // );
        };
        if (!app.isReady()) {
            app.on("ready", readyFunction);
        } else {
            readyFunction();
        }
    }
    onRunning() {
        app.on("second-instance", () => {
            // 当运行第二个实例时,将会聚焦到myWindow这个窗口
            const win = this.windowCreator.getWindow();
            if (win) {
                if (win.isMinimized()) {
                    win.restore();
                }
                win.focus();
            }
        });
        app.on("activate", () => {
            if (!this.windowCreator.getWindow()) {
                this.createWindow();
            }
        });
        app.setAppUserModelId("com.asa.jerry")
        // Default open or close DevTools by F12 in development
        // and ignore CommandOrControl + R in production.
        // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
        app.on('browser-window-created', (_, window) => {
            optimizer.watchWindowShortcuts(window)
        })
    }
    onQuit() {
        app.on("window-all-closed", () => {
            // console.log("app window-all-closed");
            if (process.platform !== "darwin") {
                app.quit();
            }
            // this.windowCreator.getWindow()?.hide()
            // hideMainWin()
        });

        app.on("will-quit", () => {
            // console.log("app will-quit");
            globalShortcut.unregisterAll();
        });

        if (isDev) {
            if (process.platform === "win32") {
                process.on("message", data => {
                    if (data === "graceful-exit") {
                        app.quit();
                    }
                });
            } else {
                process.on("SIGTERM", () => {
                    app.quit();
                });
            }
        }
    }
}