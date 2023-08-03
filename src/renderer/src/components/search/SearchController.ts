import { getStore } from "@/common/base/store";
import { ThirdPlugin } from "@/common/core/plugins";

export class SearchController {

    constructor() {

    }

    pluginOut(plugin: ThirdPlugin) {
        getStore("plugins_store").resetPlaceholder();
    }

    setPlaceholder(placeholder: string) {
        getStore("plugins_store").setPlaceholder(placeholder);

    }

    getStore() {
        return getStore("plugins_store");
    }

}