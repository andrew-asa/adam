import { useTransitionFallthroughEmits } from "element-plus";
import { isNodeEnv } from "./app_utils";
import { Action, BrowserController, Controller } from "./browsercontroller";
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { renderer_fun_call_msg_name, renderer_msg_name } from "@/common/common_const";

interface Renderer {
    /**
     * 发信息
     * @param channel
     * 
     */
    send(channel: string, data: any): void;
    /**
     * 异步发消息
     */
    sendSync(channel: string, data: any): void;
    /**
     * 方法调用
     */
    invoke(channel: string, data: any): any
}

interface RendererFunctionCall {
    call(channel: string, data: any): void
}

class defaultDevRenderer implements Renderer {
    private browserAction: Action;
    constructor() {
        this.browserAction = new BrowserController();
    }

    sendSync(channel: string, data: any): void {
        console.log(channel, data);
    }
    send(channel: string, data: any): void {
        data && data.type && this.browserAction.action(data.type, data.data);
        // console.log(channel, data);
    }

    invoke(channel: string, data: any): void {
        return this.sendSync(channel, data);
    }
}
/**
 * main/services/RendererAPI => main/services/controller
 * 发消息
 */
// const renderer_msg_name = "renderer-msg-trigger"


export default class AppController {
    private renderer: Renderer
    constructor() {
        // console.log("init AppController");
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