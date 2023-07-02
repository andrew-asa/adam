import { getAction } from "@/main/common/action";
import { actions_name } from "@/main/common/common_const";
import { BrowserWindow, ipcMain } from "electron";

export class RubickApiAdapter {
    constructor() {
        this.init();
    }
    init() {
        console.log("init RubickApiAdapter icppMain on rubick-msg-trigger");
        ipcMain.on('rubick-msg-trigger', async (event, arg) => {
            const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getAction(actions_name.get_main_window)();
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