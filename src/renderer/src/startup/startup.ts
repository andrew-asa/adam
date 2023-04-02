import { App } from '@vue/runtime-core'
import element_plus_starter from './element_plus_starter'
import vue3_contentmenu_starter from './vue3_contentmenu_starter'
import { install_ctx } from './app_starter'
export function start(app: App) {
    element_plus_starter(app)
    vue3_contentmenu_starter(app)
    install_ctx()
}
