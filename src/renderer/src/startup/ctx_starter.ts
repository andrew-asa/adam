import AppController from "@renderer/utils/app/appcontroller"
import { App } from "vue"
import * as commomConstant from "@renderer/utils/constants/common_const"
import * as dom_utils from "@renderer/utils/dom_utils"
import { starter } from "./starter"
import _ from 'lodash'
const empty_fun = () => {
}
export const ctx = Object.freeze({
    app: {
        controller: new AppController(),
        search: {
            hooks: {
                onShow: empty_fun,
                onHide: empty_fun
            }
        }
    },
    constant: {
        ...commomConstant
    },
    utils: {
        dom: dom_utils
    },
    lib:{
        _
    }
})
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