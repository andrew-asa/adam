import { getAction } from "@main/common/action";
import { BrowserWindow, ipcMain } from "electron";
import * as controller from "./contronler";

/**
 * 提供给前端的接口
 */
class RendererAPI {
    public setup() {
        // 响应 前端事件
        ipcMain.on('renderer-msg-trigger', async (event, arg) => {
            const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getAction('get-main-window')();
            const data = arg.data || {};
            const fn = this[arg.type] || controller[arg.type];
            if (fn) {
                const rdata = await fn(data, window, event);
                event.returnValue = rdata;
            } else {
                console.log(`RendererAPI 没有找到对应的方法！${arg.type}`);
            }
        });
    }
}
export default new RendererAPI()