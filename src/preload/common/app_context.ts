import { PluginDBServices } from '@/common/base/services/db/PluginDBServices'
import { PluginViewApi } from '@/common/base/PluginViewApi'
import * as action from '@/common/base/action'
import * as store from '@/common/base/store'
import { ThirdPlugin } from '@/common/core/plugins'
import { extend } from '@/common/common_utils'
import { PluginElectronServices } from '@/common/base/services/electron/PluginElectronServices'
import axios from 'axios'
import _ from 'lodash'
import { export_stores_name } from '@/common/common_const'
import { PluginPluginServices } from '@/common/base/services/plugin/PluginPluginServices'
const hooks = {}

export const ctx = {
  app: {
    controller: new PluginViewApi(),
  },
  /**
   * 插件事件的注册以及触发
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
  /**
   * 提供的工具方法
   */
  utils: {
    extend: extend,
    action: action,
    store: store
  },
  /**
   * 后端提供给前端的接口
   */
  services: {
    electron: new PluginElectronServices(),
    db: new PluginDBServices(),
    plugin: new PluginPluginServices(),
  },
  /**
   * 归功的第三方lib
   */
  lib: {
    axios: axios,
    _: _
  }
}

function loadPlugin(pluginName: string, options?: any) {
  console.log(`app_context loadPlugin ${pluginName}`)
  // 插件api设置状态
  // ctx.app.controller.loadPlugin(plugin)
  store.registerStore(export_stores_name.current_plugin_name, pluginName)
  // ctx.app.db.loadPlugin(plugin)
  // 通知插件监听
  ctx.plugin.trigger('PluginEnter', options || {})
  ctx.plugin.trigger('PluginReady', options || {})
}

function unloadPlugin(plugin: ThirdPlugin) {
  ctx.plugin.trigger('PluginOut', {})
  // ctx.app.controller.unloadPlugin(plugin)
  store.deleteStore(export_stores_name.current_plugin_name)
}

export type Ctx = typeof ctx

export function start_adam_preload() {
  // @ts-ignore
  // window.ctx = ctx
  Object.defineProperty(window, 'ctx', {
    value: ctx
  })
}
