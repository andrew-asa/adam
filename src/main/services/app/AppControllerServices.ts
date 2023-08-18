import { getStore } from "@/common/base/store";
import { ServicesProvider } from "@/common/core/types";
import { BrowserView, BrowserWindow, Menu, dialog, shell } from "electron";
import { CONFIGURE_DIR, isMacOS } from "../../common/common_const";
import { stores_name } from "@/main/common/common_const";
import { openFile } from "../appsearch";
import { is } from "@electron-toolkit/utils";
import path from "path";

export class AppControllerServices implements ServicesProvider {
    static servicesName: string = stores_name.services.app
    static getServices(): AppControllerServices {
        return getStore(AppControllerServices.servicesName)
    }
    /**
     * app 后端控制器
     */
    constructor() {
        console.log("init AppController");
    }

    /**
     * 打开控制台
     */
    openConsole() {
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
    openCurrentPluginConsole(name: string) {
        const services = getStore(stores_name.services.plugin)
        services.openPluginConsole(name)
    }

    show() {
        const win = getStore(stores_name.app_main_window)
        if (win) {
            win.show()
        }
    }

    removeAllPluginView() {
        const win: BrowserWindow = getStore(stores_name.app_main_window)
        if (win) {
            const views: BrowserView[] = win.getBrowserViews()
            for (const view of views) {
                win.removeBrowserView(view)
            }
        }
    }

    hide() {
        this.hideMainWin()
    }
    /**
     * @Author andrew
     * @Description 显示主窗口
     * @Date 2023-03-25 12:09:48
     */
    showMainWin() {
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
    hideMainWin() {
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
    quit() {
        const app = getStore(stores_name.main_app)
        app && app.quit()
    }
    /**
     * @Author andrew
     * @deprecated 退出程序
     */
    exit() {
        const app = getStore(stores_name.main_app)
        app && app.exit(-1)
    }

    /**
     * @Author andrew
     * @Description 重新启动
     * @Date 2023-03-25 12:16:59
     */
    relaunch() {
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
    openInBrowser() {
        let url = process.env['ELECTRON_RENDERER_URL'] || ""
        // console.log(url);
        shell.openExternal(url)
    }

    /**
     * 打开用户目录
     */
    openUserHome() {
        openFile(CONFIGURE_DIR)
    }


    /**
     * @Author andrew
     * @Description 取消/打开 悬浮小球
     * @Date 2023-03-28 16:50:30
     */
    toggleBall() {

    }

    /**
     * 浏览器前进
     */
    forward() {
        let win = getStore(stores_name.app_main_window)
        win && win.webContents.goForward()
    }

    /**
     * 浏览器后退
     */
    back() {
        let win = getStore(stores_name.app_main_window)
        win && win.webContents.goBack()
    }

    /**
     * 刷新
     */
    refresh() {
        let win = getStore(stores_name.app_main_window)
        win && win.webContents.reload()
    }



    /**
     * 显示主页
     */
    home() {
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
    setWindowSize({ width, height }) {
        // console.log(`setWindowSize ${width} ${height}`);
        const win = getStore(stores_name.app_main_window)
        win && win?.setSize(width, height)
    }
    /**
     * 设置扩展高度
     */
    setExpendHeight({ height }) {
        // console.log(`setExpendHeight  ${height}`);
        const win = getStore(stores_name.app_main_window)
        if (win) {
            let size = win.getSize()
            win.setSize(size[0], height)
        }
    }





    setPlaceholder(text: string) {
        this.executeMainViewJavaScript(`ctx.app.search.setPlaceholder("${text}");`)
    }

    executeMainViewJavaScript(s: string) {
        let win = getStore(stores_name.app_main_window)
        win && win.webContents.executeJavaScript(s)
    }

    async openFolderDialogSync() {

        const selectedFolder = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        if (selectedFolder.canceled) {
            return null;
        }
        return selectedFolder.filePaths[0];
    }

    openFolderDialog() {

        return dialog.showOpenDialog({
            properties: ['openDirectory']
        });
    }

    hasPluginAndNoIternal(options) {
        return options.hasPlugin && options.pluginType !== 'internal'
    }
    async showPopupMenu(options) {
        const pn = options.name
        let pluginMenu: any = [
        ]
        if (this.hasPluginAndNoIternal(options)) {
            pluginMenu = pluginMenu.concat([{
                label: '插件控制台',
                click: () => {
                    const services = getStore(stores_name.services.plugin)
                    services.openPluginConsole(pn)
                }
            }, {
                label: '刷新插件',
                click: () => {
                    const services = getStore(stores_name.services.plugin)
                    services.refreshPluginView(pn)
                }
            },
            {
                label: '当前插件信息',
                submenu: [
                    {
                        label: '简介'
                    },
                    {
                        label: '功能'
                    }
                ]
            },
            {
                label: '分离窗口',
                // click: newWindow
            }
            ])
        } else {
            pluginMenu = pluginMenu.concat([{
                label: '插件控制台',
                click: () => {
                    this.openConsole()
                }
            }, {
                label: '刷新',
                click: () => {
                    this.refresh()
                }
            }, {
                label: '插件管理',
                click: () => {

                }
            }])
        }
        let menu = Menu.buildFromTemplate(pluginMenu);
        menu.popup(options)
    }
}