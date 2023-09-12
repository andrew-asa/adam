import { App } from "vue";
import { Starter } from "./starter";
import { createI18n } from "vue-i18n";
import langs from "../i18n";

export class i18_starter implements Starter {
    name: string = "i18_starter"
    start(app: App) {

        console.log(`i18_starter start`);
        const i18n = createI18n({
            legacy: true,
            locale: 'zh-CN',
            messages: langs
        })
        app.use(i18n)
    }
}