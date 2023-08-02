import { optimizer } from '@electron-toolkit/utils';
import electron, { app, BrowserWindow, globalShortcut } from 'electron';
import { actions_name, isDev, isMacOS, isProduction, stores_name } from '@main/common/common_const';
import { AppMainWindowCreator } from './AppWindow'

import { AppStarter } from './startup/AppStarter';
import { Starter, WindowCreator } from './type';
import { registerAction } from '@/common/base/action';
import { registerStore } from '@/common/base/strore';
export class App {
    /**
     * 主窗口生成器
     */
    public windowCreator: WindowCreator;
    /**
     * 额外工作启动器
     */
    public appExtWordStarter: Starter
    constructor() {
        this.windowCreator = new AppMainWindowCreator()
        this.appExtWordStarter = new AppStarter()
    }
    start() {
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
        // registerAction(actions_name.get_main_window, () => this.windowCreator.getWindow())
    }
    onReady() {
        const readyFunction = () => {
            this.createWindow();
            // const mainWindow = this.windowCreator.getWindow();
            // API.init(mainWindow);
            // setupApp(app);
            registerStore(stores_name.main_app, app)
            registerStore(stores_name.app, this)
            this.appExtWordStarter.start();
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
        app.setAppUserModelId("com.asa.adam")
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