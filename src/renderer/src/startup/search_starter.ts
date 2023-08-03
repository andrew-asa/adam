import { App } from "vue";
import { starter } from "./starter";
import { storeToRefs } from "pinia";
import { userStore } from "../components/search/plugins/plugins_store";
import { init } from "../components/search/plugins/handler/handlers";
import { registerStore } from "@/common/base/store";

export class search_starter implements starter {
    name: string = "search_starter"
    start(app: App) {
        const store = userStore()
        store.initOptions();
        registerStore("plugins_store", store);
        init(store);
    }
}