import _ from "lodash";

import { PluginHandler } from "@/common/core/PluginHandler";
import { SystemAppHandler } from "./handler/SystemAppHandler";
import { CodePluginHandler } from "./handler/CodePluginHandler";
import { DefaultPluginHandler } from "./handler/DefaultPluginHandler";
import { WebPluginHandler } from "./handler/WebPluginHandler";
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
// export function init() {
//     addHandlers(
//         [
//             new SystemAppHandler(),
//             new CodePluginHandler()
//         ]);
// }

export function getHandler(plugin: plugin): PluginHandler {
    return _.find(handlers, h => h.needHandle(plugin)) || DH;
}