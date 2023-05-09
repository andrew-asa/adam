import { defineStore } from "pinia";
import { getApps } from "../utils/app/app_api";

export const userStore = defineStore("demo_result", {
    state: () => {
        return {
            searchValue: "",
            options: [
                {
                    name: "wechat",
                }
            ],
        };
    },
    actions: {
        addOption(option: any) {
            this.options.push(option);
        },
        initOptions() {
            getApps().then(({ data }) => {
                this.options = data;
            })
        }
    }
})