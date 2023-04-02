import { useTransitionFallthroughEmits } from "element-plus";
import { isNodeEnv } from "./app_utils";

interface Renderer {
    send(channel: string, data: any): void;
}
class defaultRenderer implements Renderer {
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
            this.renderer = new defaultRenderer();
        }
    }
    public sendMessage(type: String, data?: any) {
        this.renderer.send(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }
    public openConsole() {
        this.sendMessage("openConsole", {});
    }
    public openInBrowser() {
        this.sendMessage("openInBrowser", {});
    }
}