import electron, { BrowserWindow, ipcMain } from "electron";
import * as controller from "./contronler";
import { renderer_fun_call_msg_name, renderer_msg_name, services_name } from "@/common/common_const";
import { stores_name } from "../common/common_const";
import { getStore, registerStore } from "@/common/base/store";
import { ServicesProvider } from "@/common/core/types";

import { DBServices } from "./db/DBServices";
import { ElectronServices } from "./electron/ElectronServices";
import { services } from "./contronler";
import { PluginServices } from "./plugins/PluginServices";
import { AppControllerServices } from "./app/AppControllerServices";
import { Logger } from "../common/core/Logger";

/**
 * 提供给前端的接口
 * ==> contronler
 */
class RendererAPI {
    logger = Logger.getLogger('RendererAPI')
    handlers = {};
    services: { [key: string]: ServicesProvider } = {};
    public setup() {
        this.registerMsgListener()
        this.registerFunCallMsgListener()

        this.initDefaultServices()

        this.initDefaultHandlers()
        registerStore(stores_name.app_renderer_api, this)
    }

    private initDefaultServices() {
        this.services = services
        const es = new ElectronServices()
        this.registerServices(services_name.electron_services, es, ElectronServices.servicesName)
        let dbpath = es.getPath('userData')
        this.registerServices(services_name.db_services, new DBServices(dbpath), DBServices.servicesName)
        this.registerServices(services_name.plugin_services, new PluginServices(), PluginServices.servicesName)
        this.registerServices(services_name.app_controller_services, new AppControllerServices(), AppControllerServices.servicesName)
    }

    private registerServices(serviceName: string, services: ServicesProvider, storeName?: string) {
        this.services[serviceName] = services
        if (storeName) {
            registerStore(storeName, services)
        }
    }

    public initDefaultHandlers() {

        Object.keys(controller).forEach((key) => {
            if (typeof controller[key] === "function") {
                this.handlers[key] = controller[key]
            }
        })
    }
    public registerHandlers(hs: { [key: string]: Function }) {
        Object.keys(hs).forEach((key) => {
            this.registerHandler(key, hs[key])
        })
    }
    public registerHandler(name: string, fun: Function) {
        if (name && fun) {
            console.log(`Registering ${name} handler.`);
            this.handlers[name] = fun
        }
    }

    private registerMsgListener() {
        // 响应 前端事件
        ipcMain.on(renderer_msg_name, async (event, arg) => {
            return this.handle(event, arg)
        });
    }

    private registerFunCallMsgListener() {
        ipcMain.handle(renderer_fun_call_msg_name, async (event, arg) => {
            return this.handle(event, arg)
        })
    }

    private async handle(event, arg) {
        const window = arg.winId ? BrowserWindow.fromId(arg.winId) : getStore(stores_name.app_main_window);
        const data = arg.data || {};
        const ext = {
            view: window,
            windId: arg.windId,
            event: event
        }
        const option = arg.option || {};
        const type = arg.type

        let fn;
        let rdata
        this.logger.debug(`handle [${option && option.services}]${type}`); 
        // 指定services
        if (option.services && this.services[option.services][type]) {
            rdata = await this.services[option.services][type](data, ext);
        } 
        // else if (this[arg.type] || this.handlers[type]) {
        //     fn = this[arg.type] || this.handlers[type];
        //     rdata = await fn(data, ext);
        // } 
        else {
            console.log(`RendererAPI 没有找到对应的方法！${arg.type} option: ${JSON.stringify(option)}`);
        }
        event.returnValue = rdata;
        return rdata
    }
}
export default new RendererAPI()