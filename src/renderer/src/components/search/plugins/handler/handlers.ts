import _ from "lodash";
import { CodePluginHandler } from "./CodePluginHandler";
import { PluginHandler } from "./PluginHandler";
import { SystemAppHandler } from "./SystemAppHandler";

const handlers = [];
export function addHandler(handler: PluginHandler) {
    handlers.push(handler);
}
export function addHandlers(handlers: PluginHandler[]) {
    handlers.forEach(h => addHandler(h));
}
export function init(store) {
    addHandlers(
        [
            new SystemAppHandler(store),
            new CodePluginHandler(store)
        ]);
}
export function getHandler(plugin: plugin) {
    return _.find(handlers, h => h.needHandler(plugin));
}