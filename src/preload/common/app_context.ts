import { AppController } from '@/common/base/AppController'
import { PluginViewApi } from '@/common/base/PluginViewApi'
import * as action from '@/common/base/action'
const hooks = {}
export const ctx = {
  app: {
    controller: new PluginViewApi()
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
    }
  },
  action: action
}

export type Ctx = typeof ctx

export function start_adam_preload() {
  // @ts-ignore
  // window.ctx = ctx

  Object.defineProperty(window, 'ctx', {
    value: ctx
  })
}
