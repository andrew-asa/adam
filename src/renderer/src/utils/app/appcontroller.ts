import { useTransitionFallthroughEmits } from "element-plus";
import { isNodeEnv } from "./app_utils";

interface Renderer {
    send(channel: string, data: any): void;
    sendSync(channel: string, data: any): void;
}
class defaultDevRenderer implements Renderer {
    sendSync(channel: string, data: any): void {
        console.log(channel, data);
    }
    send(channel: string, data: any): void {
        console.log(channel, data);
    }
}
const renderer_msg_name = "renderer-msg-trigger"
export default class AppController {
    private renderer: Renderer
    constructor() {
        console.log("init AppController");
        this.initRenderer();
    }
    private initRenderer() {
        // node环境
        if (isNodeEnv()) {
            const { ipcRenderer } = window.require("electron");
            this.renderer = ipcRenderer;
        } else {
            this.renderer = new defaultDevRenderer();
        }
    }
    public sendSyncMessage(type: String, data?: any) {
        this.renderer.sendSync(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }
    public sendMessage(type: String, data?: any) {
        this.renderer.send(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }

    /**
     * @description 前进
     */
    public forward() {
        this.sendMessage("forward", {});
    }
    /**
     * @description 后退
     */
    public back() {
        this.sendMessage("back", {});
    }
    public openConsole() {
        this.sendMessage("openConsole", {});
    }
    public openInBrowser() {
        this.sendMessage("openInBrowser", {});
    }
    /**
     * @description 给当前选中的插件发送改变的文本
     */
    public sendSubInputChangeEvent(value: String) {
        this.sendSyncMessage("subInputChangeEvent", { text: value });
    }
}