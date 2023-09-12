import { App } from "vue";
import { Starter } from "./starter";
import { createPinia } from "pinia";

export class pinia_starter implements Starter {
    name: string = "pinia_starter"
    start(app: App) {
        app.use(createPinia())
    }
}