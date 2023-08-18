import { App } from "vue"
import * as commomConstant from "@renderer/utils/constants/common_const"
import * as dom_utils from "@renderer/utils/dom_utils"
import * as common_utils from "@/common/common_utils"
import * as hook from '@renderer/core/hook'
import { starter } from "./starter"
import _ from 'lodash'
import { switchToRoute } from "../router"
import { AppController } from "@/common/base/services/app/AppController"
import * as store from "@/common/base/store"
import { SearchController } from "../components/search/SearchController"
import { AppDBServices } from "@/common/base/services/db/AppDBServices"
import { ElectronServices } from "@/common/base/services/electron/ElectronServices"
import { RendererPluginServices } from "../components/search/services/RendererPluginServices"
const hooks = {}
const empty_fun = () => {
}
const services: {
    electron: ElectronServices,
    plugin: RendererPluginServices,
    db: AppDBServices,
    [key: string]: any
} = {
    electron: new ElectronServices(),
    plugin: new RendererPluginServices(),
    db: new AppDBServices(),
}

export function registerService(name: string, service: any) {
    services[name] = service
}

export function getService(name: string) {
    return services[name]
}

const _ctx = {
    app: {
        controller: new AppController(),
        /**
         * 
         */
        search: new SearchController(),
    },
    constant: {
        ...commomConstant
    },
    /**
     * 提供的工具方法
     */
    utils: {
        common_utils,
        dom: dom_utils,
        store: store,
        hook,
        switchToRoute: switchToRoute,
    },
    lib: {
        _,
    },
    /**
     * 后端给前端的接口
     */
    services: services,
}
export const ctx = Object.freeze(_ctx)
export class ctx_starter implements starter {
    name: string = "ctx_starter"
    start(app: App) {
        Object.defineProperty(window, 'ctx', {
            configurable: false,
            writable: false,
            value: ctx,
        })
        Object.defineProperty(window, '_app', {
            configurable: false,
            writable: false,
            value: app,
        })
    }
}
