import { App } from "@vue/runtime-core";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Starter } from "./starter";

export class element_plus_starter implements Starter {
    name: string = "element_plus_starter"
    start(app: App) {
        app.use(ElementPlus)
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}
// export default function (app: App) {
//     app.use(ElementPlus)
//     for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//         app.component(key, component)
//     }
// };