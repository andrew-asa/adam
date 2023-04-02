import { App } from "@vue/runtime-core";
import ContextMenu from '@renderer/components/lib/contextmenu/ContextMenu.vue'
import ContextMenuItem from '@renderer/components/lib/contextmenu/ContextMenuItem.vue'
import ContextMenuSubmenu from '@renderer/components/lib/contextmenu/ContextMenuSubmenu.vue'
import directive from '@renderer/components/lib/contextmenu/directive'
import emitContext from '@renderer/components/lib/contextmenu/emitContext'
import hideContext from '@renderer/components/lib/contextmenu/hideContext'

export default function (app: App) {
    app.provide('emitContext', emitContext)
    app.provide('hideContext', hideContext)
    app.directive('contextmenu', directive)
    app.component(ContextMenu.name, ContextMenu)
    app.component(ContextMenuItem.name, ContextMenuItem)
    app.component(ContextMenuSubmenu.name, ContextMenuSubmenu)
};