import { api_urls } from "@/common/common_const";
import { getUrl } from "@/common/common_utils";
import axios from "axios";

const AXIOS = axios.create({
    baseURL: getUrl('')
});
export function getApps() {
    return get(api_urls.get_apps)
}
/**
 * 获取所有插件信息
 */
export function getPlugins() {
    return get(api_urls.get_plugin_list)
}
/**
 * 打开插件
 */
export function openPlugin(plugin: plugin) {
    return post(api_urls.open_plugin, plugin)
}
export function get(url: string, params?: any) {
    // return axios.get(getUrl(url), { params: params })
    return AXIOS.get(url, { params: params })
}

export function post(url: string, params?: any) {
    // return axios.post(getUrl(url), params)
    return AXIOS.post(url, params)
}
