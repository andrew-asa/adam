import { Logger } from "@renderer/utils/base/Logger";

export class EventServices {
    listeners = {}
    constructor() {

    }
    addEventListener(type, callback, options?) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    removeEventListener(type, callback?) {
        if (!(type in this.listeners)) {
            return;
        }
        if (!callback) {
            delete this.listeners[type];
            return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
            }
        }
    }
    dispatchEvent(type: string, data?: any) {
        if (!(type in this.listeners)) {
            return;
        }
        Logger.getLogger("EventServices").debug("dispatchEvent", type);
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            data ? stack[i](data) : stack[i]();
        }
    }
}