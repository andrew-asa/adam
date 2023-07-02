import { AppController } from "@/common/base/AppController"

export const ctx = {
  app: {
    controller: new AppController(),
  },
}


export function start_adam_preload() {
  // @ts-ignore
  window.ctx = ctx
}