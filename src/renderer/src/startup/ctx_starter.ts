import { App } from "vue"
import * as commomConstant from "@renderer/utils/constants/common_const"
import * as dom_utils from "@renderer/utils/dom_utils"
import * as hook from '@renderer/core/hook'
import { starter } from "./starter"
import _ from 'lodash'
import { switchToRoute } from "../router"
import { AppController } from "@/common/base/AppController"
import { getStore, registerStore } from "@/common/base/strore"
import { SearchController } from "../components/search/SearchController"
import { ThirdPlugin } from "@/common/core/plugins"
import { AppDBServices } from "@/common/base/services/db/AppDBServices"
import { ElectronServices } from "@/common/base/services/electron/ElectronServices"
import { PluginServices } from "@/common/base/services/plugin/PluginServices"
const hooks = {}
const empty_fun = () => {
}

const _ctx = {
    app: {
        controller: new AppController(),
        search: new SearchController(),
        db: new AppDBServices(),
    },
    hook,
    constant: {
        ...commomConstant
    },
    utils: {
        dom: dom_utils,
    },
    lib: {
        _
    },
    services: {
        switchToRoute: switchToRoute,
        electron:new ElectronServices(),
        plugin:new PluginServices(),
    },
    store: {
        registerStore: registerStore,
        getStore: getStore
    },

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
