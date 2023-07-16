import { getStore } from "@/common/base/strore";
import { stores_name } from "@/main/common/common_const";
import { BrowserWindow, ipcMain } from "electron";

export class RubickApiAdapter {
    constructor() {
        this.init();
    }
    init() {
        console.log("init RubickApiAdapter icppMain on rubick-msg-trigger");
        ipcMain.on('rubick-msg-trigger', async (event, arg) => {
            const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getStore(stores_name.app_main_window);
            console.log(`rubick-msg-trigger:[${arg.type}] args:[${JSON.stringify(arg)}]`);
            const fn = this[arg.type];
            if (fn) {
                const rdata = await fn(arg, window, event);
                event.returnValue = rdata;
                // return rdata
            }
            // const data = await this[arg.type](arg, window, event);
            // event.returnValue = data;
            // event.sender.send(`msg-back-${arg.type}`, data);
        });
    }
}