
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
    removeEventListener(type, callback, options) {
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
    dispatchEvent(type, data) {
        if (!(type in this.listeners)) {
            return;
        }
        var stack = this.listeners[type];
        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i](data);
        }
    }
}