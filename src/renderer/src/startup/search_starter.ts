import { App } from "vue";
import { starter } from "./starter";
import { userStore } from "../components/search/plugins/plugins_store";
import { registerStore } from "@/common/base/store";
import { export_stores_name } from "@/common/common_const";
import { ConfigureServices } from "../components/search/services/ConfigureServices";
import { registerService } from "./ctx_starter";

export class search_starter implements starter {
    name: string = "search_starter"
    start(app: App) {
        const store = userStore()
        store.initOptions();
        registerStore(export_stores_name.renderer.plugin_stores, store);
        const configureServices = new ConfigureServices();
        registerService("configure", configureServices);
    }
}