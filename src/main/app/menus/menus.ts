import { Menu } from "electron";
import { hideMainWin, openConsole, openInBrowser, quit, relaunch, showMainWin, toggleBall } from "@main/services/contronler";

export const getMainMenus = () => Menu.buildFromTemplate([
    {
        label: '检查',
        click: () => {
            openConsole()
        }
    }
])
export const getTrayMenus = () => Menu.buildFromTemplate([
    {
        type: 'normal',
        label: '主界面',
        click: showMainWin
    },
    {
        type: 'normal',
        label: '悬浮',
        click: toggleBall
    },
    {
        type: 'submenu',
        label: '开发',
        submenu: [
            {
                type: 'normal',
                label: '浏览器中打开',
                click: openInBrowser
            },
            { type: 'separator' },
            {
                type: 'normal',
                label: '主窗口开发工具',
                click: openConsole
            },
            {
                type: 'normal',
                label: '重新启动',
                click: relaunch
            },
        ]
    },
    {
        type: 'normal',
        label: '隐藏',
        click: hideMainWin
    }, {
        type: 'normal',
        label: '退出',
        click: quit
    },
])
