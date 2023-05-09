import { App } from "vue";
import { starter } from "./starter";
import { createPinia } from "pinia";

export class pinia_starter implements starter {
    name: string = "pinia_starter"
    start(app: App) {
        app.use(createPinia())
    }
}