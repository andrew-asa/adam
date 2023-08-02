import { PluginDBServices } from '@/common/base/services/db/PluginDBServices'
import { PluginViewApi } from '@/common/base/PluginViewApi'
import * as action from '@/common/base/action'
import { ThirdPlugin } from '@/common/core/plugins'
import { extend } from '@/common/common_utils'
import { PluginElectronServices } from '@/common/base/services/electron/PluginElectronServices'
import axios from 'axios'
const hooks = {}
/**
 * @type {AppController}
 * 定义给插件用的接口
 */
const services = {}

// services[services_name.electron_services] = new ElectronServices()
export const ctx = {
  app: {
    controller: new PluginViewApi(),
    db: new PluginDBServices(),

  },
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
  action: action,
  utils: {
    extend: extend
  },
  services: {
    electron: new PluginElectronServices()
  },
  lib: {
    axios:axios
  }
}

function loadPlugin(plugin: ThirdPlugin) {
  console.log(`app_context loadPlugin ${plugin.name}`)
  // 插件api设置状态
  ctx.app.controller.loadPlugin(plugin)
  ctx.app.db.loadPlugin(plugin)
  // 通知插件监听
  ctx.plugin.trigger('PluginEnter', plugin.ext)
  ctx.plugin.trigger('PluginReady', plugin.ext)
}

function unloadPlugin(plugin: ThirdPlugin) {
  ctx.plugin.trigger('PluginOut', {})
  ctx.app.controller.unloadPlugin(plugin)
  ctx.app.db.unloadPlugin(plugin)
}

export type Ctx = typeof ctx

export function start_adam_preload() {
  // @ts-ignore
  // window.ctx = ctx

  Object.defineProperty(window, 'ctx', {
    value: ctx
  })
}
