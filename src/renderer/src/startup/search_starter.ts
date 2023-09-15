import { App } from "vue";
import { Starter } from "./starter";
import { userStore } from "../components/search/plugins/plugins_store";
import { getStore, registerStore } from "@/common/base/store";
import { export_stores_name } from "@/common/common_const";
import { SearchConfigureServices } from "../components/search/services/SearchConfigureServices";
import { ctx, registerService } from "@renderer/core/context";
import { events } from "@/common/core/Events";

export class search_starter implements Starter {
    name: string = "search_starter"
    start(app: App) {

        ctx.services.event.removeEventListener(events.menus.menu_click);
        ctx.services.event.addEventListener(events.menus.menu_click, (key) => {
            getStore(export_stores_name.renderer.plugin_stores).clickMenus(key);
        });
        ctx.services.event.removeEventListener(events.renderer.search.close_plugin);
        ctx.services.event.addEventListener(events.renderer.search.close_plugin, ({ plugin }) => {
            ctx.app.search.close(ctx.services.plugin.getPluginByName(plugin.name));
        });
        ctx.services.event.removeEventListener(events.renderer.search.page_loaded);
        ctx.services.event.addEventListener(events.renderer.search.page_loaded, () => {
            const store = userStore()
            registerStore(export_stores_name.renderer.plugin_stores, store);
            const configureServices = new SearchConfigureServices();
            registerService("configure", configureServices);
            ctx.services.plugin.init()
        })
    }
}