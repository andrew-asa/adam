import _ from "lodash";

import { PluginHandler } from "@/common/core/PluginHandler";
import { SystemAppHandler } from "./handler/SystemAppHandler";
import { CodePluginHandler } from "./handler/CodePluginHandler";
import { DefaultPluginHandler } from "./handler/DefaultPluginHandler";
import { WebPluginHandler } from "./handler/WebPluginHandler";
import { getAction } from "@/main/common/action";
const DH: PluginHandler = new DefaultPluginHandler();
const handlers: PluginHandler[] = [
    new SystemAppHandler(),
    new CodePluginHandler(),
    new WebPluginHandler(),
];
export function addHandler(handler: PluginHandler) {
    handlers.push(handler);
}
export function addHandlers(handlers: PluginHandler[]) {
    handlers.forEach(h => addHandler(h));
}

export function getHandler(plugin: plugin): PluginHandler {
    return _.find(handlers, h => h.needHandle(plugin)) || DH;
}

export function getHandlers(): PluginHandler[] {
    return handlers;
}


/**
 * 打开插件
 */
export function openPlugin(plugin: plugin) {
    getHandler(plugin).open(plugin, { mainWindow: getAction('get-main-window')() })
    return "success"
}
/**
 * 关闭插件
 */
export function closePlugin(plugin: plugin) {
    getHandler(plugin).close(plugin, { mainWindow: getAction('get-main-window')() })
    return "success"
}

/**
 * 获取所有插件
 */
export function getPlugins() {
    // return getApps()
    return []
}