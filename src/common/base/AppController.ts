import { AdamPlugin, ThirdPlugin } from "../core/plugins";
import { BaseAppController } from "./BaseAppController";

export class AppController extends BaseAppController {
    constructor() {
        super();
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
    // public sendSubInputChangeEvent(value: String) {
    //     this.sendSyncMessage("currentPluginInputChange", value);
    // }

    /**
     * 给当前选中的插件发送按键改变时间
     */
    // public sendPluginSomeKeyDownEvent({ modifiers, keyCode }) {
    //     this.sendSyncMessage("currentPluginKeyClick", {
    //         modifiers,
    //         keyCode
    //     })
    // }
    public home() {
        this.sendMessage("home", {});
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
}