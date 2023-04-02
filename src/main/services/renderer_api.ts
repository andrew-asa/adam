import { getAction } from "@main/common/action";
import { BrowserWindow, ipcMain } from "electron";
import { openConsole, openInBrowser } from "./contronler";

/**
 * 提供给前端的接口
 */
class RendererAPI {
    public setup() {
        // 响应 前端事件
        ipcMain.on('renderer-msg-trigger', async (event, arg) => {
            const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getAction('get-main-widow')();
            const data = await this[arg.type](arg, window, event);
            event.returnValue = data;
            // event.sender.send(`msg-back-${arg.type}`, data);
        });
    }

    public openConsole() {
        openConsole()
    }

    public openInBrowser() {
        openInBrowser()
    }
}
export default new RendererAPI()