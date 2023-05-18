import { DefineStoreOptions, defineStore } from "pinia";
import { getApps, getUrl, getAppIconPath } from "../utils/app/app_api";
import _ from "lodash";
import { api_urls } from "@/common/common_const";

export const userStore = defineStore({
    id: "result_store",
    state: () => ({
        searchValue: "",
        options: [],
        apps: [],
        pageCount: 5,
        _init: false
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
            // console.log(`search: ${value} result: ${JSON.stringify(s)}`);
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