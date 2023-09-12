import { App } from "vue";
import { Starter } from "./starter";
import { userStore } from "../components/search/plugins/plugins_store";
import { getStore, registerStore } from "@/common/base/store";
import { export_stores_name } from "@/common/common_const";
import { ConfigureServices } from "../components/search/services/ConfigureServices";
import { ctx, registerService } from "./ctx_starter";
import { events } from "@/common/core/Events";

export class search_starter implements Starter {
    name: string = "search_starter"
    start(app: App) {
        const store = userStore()
        registerStore(export_stores_name.renderer.plugin_stores, store);
        const configureServices = new ConfigureServices();
        registerService("configure", configureServices);
        ctx.services.event.removeEventListener(events.menus.menu_click);
        ctx.services.event.addEventListener(events.menus.menu_click, (key) => {
            getStore(export_stores_name.renderer.plugin_stores).clickMenus(key);
        });
        ctx.services.event.removeEventListener(events.renderer.search.close_plugin);
        ctx.services.event.addEventListener(events.renderer.search.close_plugin, ({ plugin }) => {
            ctx.app.search.close(ctx.services.plugin.getPluginByName(plugin.name));
        });
    }
}