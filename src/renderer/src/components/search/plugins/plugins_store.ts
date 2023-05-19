import { DefineStoreOptions, defineStore } from "pinia";
import _ from "lodash";
import { api_urls } from "@/common/common_const";
import { getAppIconPath, getApps } from "@/renderer/src/utils/app/app_api";

export const userStore = defineStore({
    id: "plugins_store",
    state: () => ({
        /**
         * 系统应用
         */
        apps: [],
        /**
         * 可选参见
         */
        options: [],
        /**
         * 搜索关键字
         */
        searchValue: "",
        /**
         * 当前选中标签
         */
        currentSelect: 0,
        /**
         * 当前选中插件
         */
        currentPlugin: {},
        /**
         * 粘贴板中文件
         */
        clipbordFile: [],
        pageCount: 5,
        _init: false,
    }),
    actions: {
        setPageCount(pageCount: number) {
            console.log(`setPageCount: ${pageCount}`);
            if (pageCount > 0) {
                this.pageCount = pageCount;
                this._showOptions(this.apps);
            }
        },
        addOption(option: any) {
            this.options.push(option);
        },
        initOptions() {
            if (!this._init) {
                getApps().then(({ data }) => {
                    _.each(data, (app: any) => {
                        app.icon_path = getAppIconPath(app.icon);
                        app.zIndex = 0;
                        this.apps.push(app);
                    })
                    if (!_.isEmpty(this.apps)) {
                        // this.options = [this.apps.shift()];
                        this._showOptions(this.apps);
                    }
                    this._init = true;
                })
            } else {
                this._showOptions(this.apps);
            }
        },
        search(value: string) {
            this.searchValue = value;
            const s = this.apps.filter((app: any) => {
                return app.name.includes(value);
            })
            this._showOptions(s);
        },
        _showOptions(apps, page = 0) {
            this.options = apps.slice(page * this.pageCount, (page + 1) * this.pageCount);
        },
        reshowOptions() {
            this._showOptions(this.apps);
        }
    },
})