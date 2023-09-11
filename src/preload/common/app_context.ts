import { PluginDBServices } from '@/common/base/services/db/PluginDBServices'
import { PluginViewApi } from '@/common/base/services/app/PluginViewApi'
import * as store from '@/common/base/store'
import { ThirdPlugin } from '@/common/core/plugins'
import { PluginElectronServices } from '@/common/base/services/electron/PluginElectronServices'
import axios from 'axios'
import _ from 'lodash'
import { export_stores_name } from '@/common/common_const'
import { PluginPluginServices } from '@/common/base/services/plugin/PluginPluginServices'
import { EventServices } from '@/common/core/EventServices'
import { events } from '@/common/core/Events'
const services = {
  electron: new PluginElectronServices(),
  db: new PluginDBServices(),
  plugin: new PluginPluginServices(),
  event: new EventServices(),
}
const lib = {
  axios: axios,
  _: _
}

export const ctx = {
  app: {
    controller: new PluginViewApi(),
  },
  /**
   * 后端提供给前端的接口
   */
  services: services,
  /**
   * 事件合集
   */
  events: events,
  /**
   * 提供的第三方lib
   */
  lib: lib,
}
function loadPlugin(pluginName: string, options?: any) {
  console.log(`app_context loadPlugin ${pluginName}`)
  store.registerStore(export_stores_name.current_plugin_name, pluginName)
  ctx.services.event.dispatchEvent(ctx.events.plugin.plugin_enter, options || {})
  ctx.services.event.dispatchEvent(ctx.events.plugin.plugin_ready, options || {})
}

function unloadPlugin(plugin: ThirdPlugin) {
  store.deleteStore(export_stores_name.current_plugin_name)
  ctx.services.event.dispatchEvent(ctx.events.plugin.plugin_out, null)
}

export type Ctx = typeof ctx

const internal = {
  plugin: {
    loadPlugin: loadPlugin,
    unloadPlugin: unloadPlugin
  },
}
export function start_adam_preload() {

  Object.defineProperty(window, 'ctx', {
    value: ctx
  })
  Object.defineProperty(window, '__internal__', {
    value: internal
  })
}