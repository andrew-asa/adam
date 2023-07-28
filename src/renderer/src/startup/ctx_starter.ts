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
const hooks = {}
const empty_fun = () => {
}
function loadPlugin(plugin: ThirdPlugin) {
    console.log(`load internal Plugin ${plugin.name}`)
    // 插件api设置状态
    // ctx.app.controller.loadPlugin(plugin)
    // ctx.app.db.loadPlugin(plugin)
    // 通知插件监听
    ctx.plugin.trigger('PluginEnter', plugin.ext)
    ctx.plugin.trigger('PluginReady', plugin.ext)
}

function unloadPlugin(plugin: ThirdPlugin) {
    ctx.plugin.trigger('PluginOut', {})
    // ctx.app.controller.unloadPlugin(plugin)
    // ctx.app.db.unloadPlugin(plugin)
}
const _ctx = {
    app: {
        controller: new AppController(),
        search: new SearchController()
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
    },
    store: {
        registerStore: registerStore,
        getStore: getStore
    },
    /**
     * 供内部插件使用
     */
    plugin: {
        on(name: string, fn: Function) {
            hooks[name] = fn
        },
        trigger(name: string, ...args: any[]) {
            const fn = hooks[name]
            if (fn) {
                fn(...args)
            }
        },
        getHooks() {
            return hooks
        },
        getHook(name: string) {
            return hooks[name]
        },
        _loadPlugin: loadPlugin,
        _unloadPlugin: unloadPlugin
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
