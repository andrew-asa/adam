import AppController from "@renderer/utils/app/appcontroller"
import { App } from "vue"
import * as commomConstant from "@renderer/utils/constants/common_const"
export const ctx = Object.freeze({
    app: {
        controller: new AppController(),
    },
    constant: {
        ...commomConstant
    }
})
export function install_ctx(app: App) {
    Object.defineProperty(window, 'ctx', {
        configurable: false,
        writable: false,
        value: ctx,
    })
}