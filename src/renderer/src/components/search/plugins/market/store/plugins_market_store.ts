import { defineStore } from "pinia";

interface PluginsMarketState {
    totalPlugins: Array<ThirdPlugin>,
    localPlugins: Array<ThirdPlugin>,
    recommendPlugins: Array<string>,
    newPlugins: Array<string>,
}
import { total_plugins, recomend_plugins, new_plugins } from '../action/fake/apps';
import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";
import { ctx } from "@/renderer/src/startup/ctx_starter";
import { copyPlugin, copyThirdPlugin } from "../../utils/plugins_utils";
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
            let find = false
            let el
            this.totalPlugins.forEach(element => {
                if (element.name === plugin.name) {
                    element.isloading = true
                    find = true
                    el=element
                }
            });
            if (el) {
                // ctx.app.controller.installPlugin(plugin)
                const cp = copyThirdPlugin(plugin)
                 ctx.app.controller.installPlugin(cp).then(() => {
                     el.isdownload=true
                 })
            }
        }
    },
})