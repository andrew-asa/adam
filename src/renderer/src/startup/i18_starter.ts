import { App } from "vue";
import { starter } from "./starter";
import { createI18n } from "vue-i18n";

export class i18_starter implements starter {
    name: string = "i18_starter"
    start(app: App) {

        console.log(`i18_starter start`);
        const i18n = createI18n({
            locale: 'en',
            messages: {
                en: {
                    hello: 'Hello!'
                },
                cn: {
                    hello: '你好!'
                }
            }
        })
        app.use(i18n)
    }
}