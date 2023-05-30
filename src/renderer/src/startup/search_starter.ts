import { App } from "vue";
import { starter } from "./starter";
import { storeToRefs } from "pinia";
import { userStore } from "../components/search/plugins/plugins_store";

export class search_starter implements starter {
    name: string = "search_starter"
    start(app: App) {
        const store = userStore()
        store.initOptions();
    }
}