import { api_urls, default_host, default_port, default_url_prefix } from "@/common/common_const";
export function getUrl(url: string, host: string = default_host, port = default_port, prefix: string = default_url_prefix) {
    return `${host}:${port}${prefix}${url}`;
}
export function getAppIconPath(path) {
    return `${getUrl(api_urls.get_file)}?path=${path}`;
}