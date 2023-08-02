import { AdamPlugin } from "@/common/core/plugins";
import { ServicesProvider } from "@/common/core/types";

export class PluginServices implements ServicesProvider {

    openPlugin({ plugin, ext }) {
        console.log(`PluginServices openPlugin ${plugin.name}`)
    }

    closePlugin({ plugin, ext }) {
        console.log(`PluginServices closePlugin ${plugin.name}`)
    }

    getPlugins(): AdamPlugin[] {
        return []
    }

    installPlugin({ plugin }) {

    }
}