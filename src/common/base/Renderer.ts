import { renderer_fun_call_msg_name, renderer_msg_name } from "../common_const";


export interface RendererReqOption {
    /**
     * 后端哪个services进行响应
     */
    services?: string
    /**
     * 请求来源哪个插件
     */
    from?: string
    [key: string]: any
}

export interface Renderer {
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

function getElectronRenderer(): Renderer {
    const { ipcRenderer } = window.require("electron");
    return ipcRenderer
}
/**
 * 异步发消息
 */
export function sendSyncMessage(type: String, data: any = {}, option: RendererReqOption = {}) {
    renderer.sendSync(renderer_msg_name, constructorParams(type, data, option));
}
/**
 * 发消息
 */
export function sendMessage(type: String, data: any = {}, option: RendererReqOption = {}) {
    return renderer.send(renderer_msg_name, constructorParams(type, data, option));
}

/**
  函数调用
 * @param type 
 * @param data 
 * @returns 
 */
export async function invokeMessage(type: String, data: any = {}, option: RendererReqOption = {}) {
    return await renderer.invoke(renderer_fun_call_msg_name, constructorParams(type, data, option));
}
/**
 * 同步调用
 */
export async function invokeMessageSync(type: String, data: any = {}, option: RendererReqOption = {}) {
    try {
        const result = await renderer.invoke(renderer_fun_call_msg_name, constructorParams(type, data, option));
        return result
    } catch (error) {
        console.log(error);
    }
}

function constructorParams(type: String, data: any = {}, option: RendererReqOption = {}) {
    return {
        type: type,
        data: data,
        option: option
    }
}


export const renderer: Renderer = isNodeEnv() ? getElectronRenderer() : new DefaultDevRenderer();
