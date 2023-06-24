// export default {
//     linux(): boolean {
//         return process.platform === "linux";
//     },
//     macOS(): boolean {
//         return process.platform === "darwin";
//     },
//     windows(): boolean {
//         return process.platform === "win32";
//     },
//     production(): boolean {
//         return process.env.NODE_ENV !== "development";
//     },
//     dev(): boolean {
//         return process.env.NODE_ENV === "development";
//     },

// };

/**
 * 渲染消息
 */
export const renderer_msg_name = "renderer-msg-trigger"

/**
 * 方法调用信息
 */
export const renderer_fun_call_msg_name = "renderer-fun-call-msg-trigger"
/**
 * 后端端口
 */
export const backendpor = 3333
/**
 * 提供的api url
 */
export const api_urls = {
    // 主页
    home: "/",
    // 获取系统已经安装的应用
    get_apps: "/apps/get",
    // 获取文件
    get_file: "/file",
    // 获取所有插件
    get_plugin_list: "/plugin/list",
    // 安装插件
    load_plugin: "/plugin/load",
    // 卸载插件
    unload_plugin: "/plugin/unload",
    // 打开插件
    open_plugin: "/plugin/open",
    // 关闭插件
    close_plugin: "/plugin/close",
}


/**
 * 默认本地地址
 */
export const default_host = "http://127.0.0.1";
/**
 * 默认url前缀
 */
export const default_url_prefix = "/api";
/**
 * 默认端口
 */
export const default_port = backendpor;

