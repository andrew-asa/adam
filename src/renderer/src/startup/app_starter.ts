import AppController from "@renderer/utils/app/appcontroller"
import { App } from "vue"

export const ctx = Object.freeze({
    app: {
        controller: new AppController(),
    }
})
export function install_ctx(app: App) {
    Object.defineProperty(window, 'ctx', {
        configurable: false,
        writable: false,
        value: ctx,
    })
}
