import { ctx } from "@renderer/core/context";
import { db_keys } from "@renderer/utils/constants/common_const";
import _ from "lodash";

export interface Configure {

    /**
     * 是否自动粘贴到搜索框
     */
    autoPasteIntoSearch: Boolean
    /**
     * 系统语言
     */
    locale: string,
    /**
     * 搜索框提示
     */
    placeholder: string,
    [key: string]: any
}
export const default_conf: Configure = {
    autoPasteIntoSearch: false,
    locale: "zh-CN",
    placeholder: "Hi Adam",
}
export class SearchConfigureServices {
    conf: Configure = default_conf
    constructor() {
        this.init();
    }

    init() {
        console.log(`renderer ConfigureServices init`);
        ctx.services.db.get(db_keys.search_configure).then((data) => {
            if (!data || _.isEmpty(data.data)) return
            this.conf = _.extend({}, default_conf, data.data)
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

    getPlaceholder() {
        return this.conf.placeholder
    }

    sePlaceholder(value: string) {
        this.conf.placeholder = value
        this.doUpdate()
    }

    getConfigure() {
        return this.conf
    }

    updateConfigure(conf: Configure) {
        this.conf = _.extend({}, this.conf, conf)
        // console.log(`ConfigureServices update conf`, this.conf);
        this.doUpdate()
    }
}

