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
        this.invoke("forward", {});
    }
    /**
     * @description 后退
     */
    public back() {
        this.invoke("back", {});
    }
    public openConsole() {
        this.invoke("openConsole", {});
    }
    public openInBrowser() {
        this.invoke("openInBrowser", {});
    }
    
    public home() {
        this.invoke("home", {});
    }


    public show() {
        this.invoke("show", {});
    }

    public hide() {
        this.invoke("hide", {});
    }

    public removeAllPluginView() {
        this.invoke("removeAllPluginView", {});
    }
}