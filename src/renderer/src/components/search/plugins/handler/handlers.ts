import _ from "lodash";
import { CodePluginHandler } from "./CodePluginHandler";
import { SystemAppHandler } from "./SystemAppHandler";
import { PluginHandler } from "@/common/core/PluginHandler";
import { WebPluginHandler } from "./WebPluginHandler";
import { DefaultPluginHandler } from "./DefaultPluginHandler";
import { AdamPlugin, ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";

const handlers = [];

var DH: PluginHandler
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
            new CodePluginHandler(store),
            new WebPluginHandler(store),
        ]);
    DH = new DefaultPluginHandler(store);
}
export function getHandler(plugin: ThirdPlugin): PluginHandler {
    return _.find(handlers, h => h.needHandle(plugin)) || DH;
}



export class DefaultThirdPluginHandler implements ThirdPluginManager{
    install(plugin: ThirdPlugin): void {
        throw new Error("Method not implemented.");
    }
    uninstall(plugin: ThirdPlugin): void {
        throw new Error("Method not implemented.");
    }

    listAllPlugin(): ThirdPlugin[] {
        return [];
    }
}