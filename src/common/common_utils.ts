import { api_urls, default_host, default_port, default_url_prefix } from "@/common/common_const";
import { SystemApp, ThirdPlugin } from "./core/plugins";
export function getUrl(url: string, host: string = default_host, port = default_port, prefix: string = default_url_prefix) {
    return `${host}:${port}${prefix}${url}`;
}
export function getAppIconPath(path) {
    return `${getUrl(api_urls.get_file)}?path=${path}`;
}

export function copyThirdPluginToAppPlugin(plugin: ThirdPlugin): SystemApp {
    return {
        name: plugin.name,
        pluginName: plugin.pluginName,
        description: plugin.description,
        pluginType: 'app',
        logo: plugin.logo,
        path: plugin.main || '',
        version: plugin.version,
    }
}