import { Menu, Tray } from "electron";
import { Starter } from "../type";
import { RendererApiStarter } from "./RendererApiStarter";
import trayIcon from '@resources/assets/tray.png?asset'
import { AppControllerServices } from "@/main/services/app/AppControllerServices";
import { Mode, Modes } from "@/common/core/types";
export class SystemTrayStarter implements Starter {
    order = RendererApiStarter.order + 1
    name = "SystemTrayStarter";
    tray: Tray | null = null

    constructor() {
        // this.tray = new Tray(trayIcon.toString())
    }
    start() {
        this.createTray()
    }

    getTrayMenus() {
        return Menu.buildFromTemplate([
            {
                type: 'normal',
                label: '主界面',
                click: () => {
                    AppControllerServices.getServices().showMainWin()
                }
            },
            {
                type: 'submenu',
                label: '模式',
                submenu: [{
                    type: 'checkbox',
                    label: '搜索框',
                    checked: AppControllerServices.getServices().getMode() === Modes.search,
                    click: (e) => {
                        AppControllerServices.getServices().setMode(Modes.search as Mode, e)
                    }
                }, {
                    type: 'checkbox',
                    label: '浏览器',
                    checked: AppControllerServices.getServices().getMode() === Modes.browser,
                    click: (e) => {
                        AppControllerServices.getServices().setMode(Modes.browser as Mode, e)
                    }
                }, {
                    type: 'checkbox',
                    label: '悬浮球',
                    checked: AppControllerServices.getServices().getMode() === Modes.question,
                    click: (e) => {
                        AppControllerServices.getServices().setMode(Modes.question as Mode, e)
                    }
                }]
            },

            {
                type: 'submenu',
                label: '开发',
                submenu: [
                    {
                        type: 'normal',
                        label: '浏览器中打开',
                        click: () => {
                            AppControllerServices.getServices().openInBrowser()
                        }
                    },
                    { type: 'separator' },
                    {
                        type: 'normal',
                        label: '主控制台',
                        click: () => {
                            AppControllerServices.getServices().openConsole()
                        }
                    },
                    {
                        type: 'normal',
                        label: '重新启动',
                        click: () => {
                            AppControllerServices.getServices().relaunch()
                        }
                    },
                    {
                        type: 'normal',
                        label: '刷新',
                        click: () => {
                            AppControllerServices.getServices().refresh()
                        }
                    },
                    {
                        type: 'normal',
                        label: '用户目录',
                        click: () => {
                            AppControllerServices.getServices().openUserHome()
                        }
                    }
                ]
            },
            {
                type: 'normal',
                label: '隐藏',
                click: () => {
                    AppControllerServices.getServices().hideMainWin()
                }
            }, {
                type: 'normal',
                label: '退出',
                click: () => {
                    AppControllerServices.getServices().quit()
                }
            },
        ])
    }

    createTray() {
        let tray = new Tray(trayIcon.toString())
        this.tray = tray
        this.tray.setToolTip('adam')
        var self = this
        this.tray.on('click', function () {
            tray.popUpContextMenu(self.getTrayMenus())
        })
    }
}