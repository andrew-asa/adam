import { Renderer } from "./Renderer";
import { AdamPlugin, ThirdPlugin } from "../core/plugins";
const renderer_msg_name = "renderer-msg-trigger"
const renderer_fun_call_msg_name = "renderer-fun-call-msg-trigger"
class defaultDevRenderer implements Renderer {

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
export class AppController {
    private renderer: Renderer
    constructor() {
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
        return this.renderer.send(renderer_msg_name, {
            type: type,
            data: data || {}
        });
    }
    public async invokeMessage(type: String, data?: any) {
        return await this.renderer.invoke(renderer_fun_call_msg_name, {
            type: type,
            data: data || {}
        });
    }
    /**
     * 同步调用
     */
    public async invokeMessageSync(type: String, data?: any) {
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
    public home() {
        this.sendMessage("home", {});
    }
    public setWindowSize(width: number, height: number) {
        this.sendMessage("setWindowSize", { width: width, height: height });
    }

    public setExpendHeight(height: number) {
        this.sendMessage("setExpendHeight", { height });
    }

    public show() {
        this.sendMessage("show", {});
    }

    public hide() {
        this.sendMessage("hide", {});
    }

    public removeAllPluginView() {
        this.sendMessage("removeAllPluginView", {});
    }

    public openPlugin(plugin: AdamPlugin) {
        return this.sendMessage("openPlugin", { plugin });
    }

    public closePlugin(plugin: AdamPlugin) {
        return this.sendMessage("closePlugin", { plugin });
    }

    public async getPlugins() {
        return this.invokeMessageSync("getPlugins", {});
    }

    public async installPlugin(plugin: ThirdPlugin) {
        return this.invokeMessageSync("installPlugin", { plugin });
    }
}