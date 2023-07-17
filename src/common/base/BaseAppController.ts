import { Renderer } from "./Renderer";
import { AdamPlugin, ThirdPlugin } from "../core/plugins";
const renderer_msg_name = "renderer-msg-trigger"
const renderer_fun_call_msg_name = "renderer-fun-call-msg-trigger"
class DefaultDevRenderer implements Renderer {

    sendSync(channel: string, data: any): void {
        console.log(channel, data);
    }
    send(channel: string, data: any): void {
        console.log(channel, data);
    }

    invoke(channel: string, data: any): void {
        return this.sendSync(channel, data);
    }
}
function isNodeEnv(): boolean {
    return typeof global !== "undefined"
}
/**
 * main/services/RendererAPI => main/services/controller
 * 发消息
 */
// const renderer_msg_name = "renderer-msg-trigger"
export class BaseAppController {
    private renderer: Renderer = new DefaultDevRenderer();
    constructor() {
        this.initRenderer();
    }
    private initRenderer() {
        // node环境
        if (isNodeEnv()) {
            const { ipcRenderer } = window.require("electron");
            this.renderer = ipcRenderer;
        }
    }
    sendSyncMessage(type: String, data?: any) {
        this.renderer.sendSync(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }
    sendMessage(type: String, data?: any) {
        return this.renderer.send(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }
    async invokeMessage(type: String, data?: any) {
        return await this.renderer.invoke(renderer_fun_call_msg_name, {
            type: type,
            data: data || {}
        });
    }
    /**
     * 同步调用
     */
    async invokeMessageSync(type: String, data?: any) {
        try {
            const result = await this.renderer.invoke(renderer_fun_call_msg_name, {
                type: type,
                data: data || {}
            });
            return result
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 设置窗口大小
     * @param width 宽度
     * @param height 高度
     * @example ctx.app.controller.setWindowSize(width, height);
     */
    public setWindowSize(width: number, height: number) {
        this.sendMessage("setWindowSize", { width: width, height: height });
    }


    /**
     * 设置窗口高度
     * @param height 高度
     * @example ctx.app.controller.setExpendHeight(height);
     */
    public setExpendHeight(height: number) {
        this.sendMessage("setExpendHeight", { height });
    }
}