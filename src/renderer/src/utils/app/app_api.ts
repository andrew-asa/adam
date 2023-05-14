import { api_urls } from "@/common/common_const";
import axios from "axios";

const default_host = "http://127.0.0.1";
const default_url_prefix = "/api";
const default_port = 3333;

export function getUrl(url: string, host: string = default_host, port = default_port, prefix: string = default_url_prefix) {
    return `${host}:${port}${prefix}${url}`;
}
export function getAppIconPath(path) {
    return `${getUrl(api_urls.get_file)}?path=${path}`;
}
export function getApps() {
    return get(api_urls.get_apps)
}

export function get(url: string, params?: any) {
    return axios.get(getUrl(url), { params: params })
}
