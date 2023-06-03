import { getApps } from "../appsearch";
import { getHandler } from "./handlers";

/**
 * 获取所有插件
 */
export function getPlugins() {
    return getApps()
}
/**
 * 打开插件
 */
export function openPlugin(plugin: plugin) {
    getHandler(plugin).handle(plugin)
    return "success"
}