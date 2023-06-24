import { defineStore } from "pinia";

interface PluginsMarketState {
    totalPlugins: Array<ThirdPlugin>,
    localPlugins: Array<ThirdPlugin>,
    recommendPlugins: Array<string>,
    newPlugins: Array<string>,
}
import { total_plugins, recomend_plugins, new_plugins } from '../action/fake/apps';
import { ThirdPlugin } from "@/common/core/plugins";
export const userStore = defineStore({
    id: "plugins_market_store",
    state: (): PluginsMarketState => ({
        /**
         * 插件总数
         */
        totalPlugins: total_plugins as Array<ThirdPlugin>,
        localPlugins: [],
        recommendPlugins: recomend_plugins,
        newPlugins: new_plugins,
    }),
    actions: {
        /**
         * 
         *插件数据初始化
         */
        init() {

        },
        /**
         * 安装
         */
        install(plugin: ThirdPlugin) {
            this.totalPlugins.forEach(element => {
                if(element.name === plugin.name) {
                    element.isloading = true
                }
            });
        }
        

    },
})