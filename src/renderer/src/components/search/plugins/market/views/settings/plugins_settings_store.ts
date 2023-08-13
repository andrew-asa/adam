import { defineStore } from "pinia";
import _ from "lodash";
import { ctx } from '@renderer/startup/ctx_starter'
import { Configure } from "@renderer/components/search/services/ConfigureServices";


export const userStore = defineStore({
    id: "plugins_settings_store",

    state: (): Configure => ({
        autoPasteIntoSearch: false,
        locale: "zh-CN"
    }),
    actions: {
        init() {
            const conf = ctx.services.configure.getConfigure()
            if (_.isEmpty(conf)) return
            this.autoPasteIntoSearch = conf.autoPasteIntoSearch
            this.locale = conf.locale || "zh-CN"
        },

        doSaveSettings() {
            ctx.services.configure.updateConfigure({
                autoPasteIntoSearch: this.autoPasteIntoSearch,
            })
        }
    },
    getters: {
    },

})