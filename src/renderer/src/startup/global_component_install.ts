import { App } from "@vue/runtime-core";

import { Starter } from "./starter";
import SvgIcon from '@renderer/components/widgets/icons/SvgIcon.vue'

export class global_component_install implements Starter {
  name: string = "global_component_install"  ;
  start(app: App) {
    app.component('SvgIcon', SvgIcon)
  }
}
