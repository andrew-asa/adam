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
    get_plugin: "/plugin/list",
    // 安装插件
    load_plugin: "/plugin/load",
    // 卸载插件
    unload_plugin: "/plugin/unload",
}


