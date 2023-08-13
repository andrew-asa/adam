import { ctx } from "@/renderer/src/startup/ctx_starter";
import { db_keys } from "@/renderer/src/utils/constants/common_const";
import _ from "lodash";

export interface Configure {

    /**
     * 是否自动粘贴到搜索框
     */
    autoPasteIntoSearch: Boolean
    locale: string
    [key: string]: any
}
export const default_conf: Configure = {
    autoPasteIntoSearch: false,
    locale: "zh-CN"
}
export class ConfigureServices {
    conf: Configure = default_conf
    constructor() {
        this.init();
    }

    init() {
        console.log(`renderer ConfigureServices init`);
        ctx.services.db.get(db_keys.search_configure).then(({ data }) => {
            if (_.isEmpty(data.data)) return
            this.conf = data.data
            // console.log(`renderer ConfigureServices fetch conf`, this.conf);
        })
    }

    isAutoPasteIntoSearch() {
        return this.conf.autoPasteIntoSearch
    }

    setIsAutoPasteIntoSearch(value: Boolean) {
        this.conf.autoPasteIntoSearch = value
        this.doUpdate()
    }

    doUpdate() {
        ctx.services.db.put(db_keys.search_configure, {
            data: this.conf
        })
    }

    getLocale() {
        return this.conf.locale
    }

    setLocale(value: string) {
        this.conf.locale = value
        this.doUpdate()
    }

    getConfigure() {
        return this.conf
    }

    updateConfigure(conf: Configure) {
        this.conf = _.extend({}, this.conf, conf)
        console.log(`ConfigureServices update conf`, this.conf);
        this.doUpdate()
    }
}

