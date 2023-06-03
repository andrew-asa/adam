import { api_urls } from "@/common/common_const";
import { getUrl } from "@/common/common_utils";
import axios from "axios";

export function getApps() {
    return get(api_urls.get_apps)
}
/**
 * 获取所有插件信息
 */
export function getPlugins() {
    return get(api_urls.get_plugin)
}

export function get(url: string, params?: any) {
    return axios.get(getUrl(url), { params: params })
}
