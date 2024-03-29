import * as dom_utils from "@renderer/utils/dom_utils"
import * as common_utils from "@/common/common_utils"
import * as hook from '@renderer/core/hook'
import { switchToRoute } from "../router"
import { AppController } from "@/common/base/services/app/AppController"
import * as store from "@/common/base/store"
import { SearchController } from "../components/search/SearchController"
import { AppDBServices } from "@/common/base/services/db/AppDBServices"
import { ElectronServices } from "@/common/base/services/electron/ElectronServices"
import { RendererPluginServices } from "../components/search/services/RendererPluginServices"
import { EventServices } from "@/common/core/EventServices"
const hooks = {}
const empty_fun = () => {
}
export const services: {
    electron: ElectronServices,
    plugin: RendererPluginServices,
    db: AppDBServices,
    event: EventServices
    [key: string]: any
} = {
    electron: new ElectronServices(),
    plugin: new RendererPluginServices(),
    db: new AppDBServices(),
    event: new EventServices(),
}
const utils = {
    common_utils,
    dom: dom_utils,
    store: store,
    hook,
    switchToRoute: switchToRoute,
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
    /**
     * 提供的工具方法
     */
    utils: utils,
    /**
     * 后端给前端的接口
     */
    services: services,
}
export const ctx = Object.freeze(_ctx)

