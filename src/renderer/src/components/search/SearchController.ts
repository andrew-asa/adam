import { getStore } from "@/common/base/strore";
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
}