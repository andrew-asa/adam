import { defineStore } from "pinia";
import { getApps } from "../utils/app/app_api";
import _ from "lodash";

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
                    app.name = app._name || app.name;
                    this.apps.push(app);
                })
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