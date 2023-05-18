import { App } from "@vue/runtime-core";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { starter } from "./starter";

export class ant_design_vue_starter implements starter {
    name: string = "ant_design_vue_starter"
    start(app: App) {
        app.use(Antd)
    }
}
// export default function (app: App) {
//     app.use(ElementPlus)
//     for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//         app.component(key, component)
//     }
// };