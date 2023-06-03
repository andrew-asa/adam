import AppController from "@renderer/utils/app/appcontroller"
import { App } from "vue"
import * as commomConstant from "@renderer/utils/constants/common_const"
import * as dom_utils from "@renderer/utils/dom_utils"
import * as hook from '@renderer/core/hook'
import { starter } from "./starter"
import _ from 'lodash'
const empty_fun = () => {
}
const _ctx = {
    app: {
        controller: new AppController(),
        search: {
        }
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
    }
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
