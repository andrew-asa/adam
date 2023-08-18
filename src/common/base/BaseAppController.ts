import { services_name } from "../common_const";
import { Renderer, renderer } from "./Renderer";
import { BaseServices } from "./services/BaseServices";
const renderer_msg_name = "renderer-msg-trigger"
const renderer_fun_call_msg_name = "renderer-fun-call-msg-trigger"

/**
 * main/services/RendererAPI => src/main/services/AppControllerServices.ts
 * 发消息
 */
// const renderer_msg_name = "renderer-msg-trigger"
export class BaseAppController extends BaseServices {
    
    serviceName: string = services_name.app_controller_services;
    constructor() {
        super();
    }
    /**
     * 设置窗口大小
     * @param width 宽度
     * @param height 高度
     * @example ctx.app.controller.setWindowSize(width, height);
     */
    public setWindowSize(width: number, height: number) {
        this.invoke("setWindowSize", { width: width, height: height });
    }


    /**
     * 设置窗口高度
     * @param height 高度
     * @example ctx.app.controller.setExpendHeight(height);
     */
    public setExpendHeight(height: number) {
        this.invoke("setExpendHeight", { height });
    }

    /**
     * 打开文件对话框
     */
    public openFolderDialog() {
        return this.invoke("openFolderDialog", {});
    }
    /**
     * 获取菜单
     */
    public getMenu() {
        return this.invoke("getMenu", {});
    }
    /**
     * 搜索框显示菜单
     */
    public showPopupMenu(options) {
        return this.invoke("showPopupMenu", options || {});
    }
}