import { defineStore } from "pinia";
import _ from "lodash";
import { ctx } from '@renderer/startup/ctx_starter'
import { Configure, default_conf } from "@renderer/components/search/services/ConfigureServices";


export const userStore = defineStore({
    id: "plugins_settings_store",

    state: (): Configure => (default_conf),
    actions: {
        init() {
            const conf = ctx.services.configure.getConfigure()
            if (_.isEmpty(conf)) return
            this.autoPasteIntoSearch = conf.autoPasteIntoSearch
            this.locale = conf.locale 
            this.placeholder = conf.placeholder
        },

        doSaveSettings() {
            ctx.services.configure.updateConfigure({
                autoPasteIntoSearch: this.autoPasteIntoSearch,
                locale: this.locale,
                placeholder: this.placeholder
            })
        },


        setPlaceholder(value: string) {
            this.placeholder = value
            ctx.services.configure.sePlaceholder(value)
        }
    },
    getters: {
    },

})