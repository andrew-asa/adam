import { AppController } from "@/common/base/AppController"
import * as action from "@/common/base/action"
const hooks = {}
export const ctx = {
  app: {
    controller: new AppController(),
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
    }
  },
  action: action
}

export type Ctx = typeof ctx

export function start_adam_preload() {
  // @ts-ignore
  window.ctx = ctx
}