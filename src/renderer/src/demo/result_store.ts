import { defineStore } from "pinia";
import { getApps, getUrl,getAppIconPath } from "../utils/app/app_api";
import _ from "lodash";
import { api_urls } from "@/common/common_const";
// import {getUrl} from "../utils/app/app_api";
export const userStore = defineStore("demo_result", {
    state: () => {
        return {
            searchValue: "",
            options: [],
            apps: [],
        };
    },
    actions: {
        addOption(option: any) {
            this.options.push(option);
        },
        initOptions() {
            getApps().then(({ data }) => {
                _.each(data, (app: any) => {
                    app.icon_path = getAppIconPath(app.icon);
                    this.apps.push(app);
                })
                if (!_.isEmpty(this.apps)) {
                    this.options = [this.apps.shift()];
                }
                // this.options = this.apps
            })
        },
        search(value: string) {
            this.options = this.apps.filter((app: any) => {
                return app.name.includes(value);
            })
        }
    }
})