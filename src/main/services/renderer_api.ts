import { getAction } from "@main/common/action";
import { BrowserWindow, ipcMain } from "electron";
import * as controller from "./contronler";
import { renderer_fun_call_msg_name, renderer_msg_name } from "@/common/common_const";
import { actions_name } from "../common/common_const";

/**
 * 提供给前端的接口
 * ==> contronler
 */
class RendererAPI {
    public setup() {
        this.registerMsgListener()
        this.registerFunCallMsgListener()
    }

    private registerMsgListener() {
        // 响应 前端事件
        ipcMain.on(renderer_msg_name, async (event, arg) => {
            return this.handle(event, arg)
        });
    }

    private registerFunCallMsgListener() {
        ipcMain.handle(renderer_fun_call_msg_name, async (event, arg) => {
            return this.handle(event, arg)
        })
    }

    private async handle(event, arg) {
        const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getAction(actions_name.get_main_window)();
        const data = arg.data || {};
        const fn = this[arg.type] || controller[arg.type];
        if (fn) {
            const rdata = await fn(data, window, event);
            event.returnValue = rdata;
            return rdata
        } else {
            console.log(`RendererAPI 没有找到对应的方法！${arg.type}`);
        }
    }
}
export default new RendererAPI()