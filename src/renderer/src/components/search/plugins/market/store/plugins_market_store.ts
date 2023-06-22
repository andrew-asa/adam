import { defineStore } from "pinia";

interface PluginsMarketState {
    totalPlugins: [];
}
export const userStore = defineStore({
    id: "plugins_market_store",
    state: (): PluginsMarketState => ({
        /**
         * 插件总数
         */
        totalPlugins: [],
    }),
    actions: {

    },
})