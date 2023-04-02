import { BrowserWindow, Tray } from "electron";
import trayIcon from '@resources/assets/tray.png?asset'
import { getTrayMenus } from "@main/app/menus/menus";
function createTray(window: BrowserWindow|null): Promise<Tray> {
    return new Promise((resolve, reject) => {
        let tray = new Tray(trayIcon.toString())
        tray.setToolTip('adam')
        tray.on('click', function (this: Tray) {
            tray.popUpContextMenu()
        })
        tray.setContextMenu(getTrayMenus())
        resolve(tray)
    })
}
export default createTray;