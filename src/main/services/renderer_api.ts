import { BrowserWindow, ipcMain } from "electron";
import * as controller from "./contronler";
import { renderer_fun_call_msg_name, renderer_msg_name } from "@/common/common_const";
import { stores_name } from "../common/common_const";
import { getStore, registerStore } from "../../common/base/strore";

/**
 * 提供给前端的接口
 * ==> contronler
 */
class RendererAPI {
    handlers = {};
    public setup() {
        this.registerMsgListener()
        this.registerFunCallMsgListener()
        this.initDefaultHandlers()
        registerStore(stores_name.app_renderer_api, this)
    }

    public initDefaultHandlers() {
        Object.keys(controller).forEach((key) => {
            if (typeof controller[key] === "function") {
                this.handlers[key] = controller[key]
            }
        })
    }
    public registerHandler(name: string, fun: Function) {
        if (name && fun) {
            console.log(`Registering ${name} handler.`);
            this.handlers[name] = fun
        }
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
        const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getStore(stores_name.app_main_window);
        const data = arg.data || {};
        const fn = this[arg.type] || this.handlers[arg.type];
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