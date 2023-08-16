import { App } from '@vue/runtime-core'
import { starter } from './starter';
import _ from 'lodash';
const starters: starter[] = [];
export function start(app: App) {
    console.log(`start app`);
    const files = import.meta.glob('./*.ts', {
        eager: true
    });

    for (const path in files) {
        const module = files[path];
        // @ts-ignore
        for (const key in module) {
            const obj = module[key];
            if (typeof obj === "function" && obj.prototype instanceof Object) {
                const instance = new obj();
                if ("start" in instance && "name" in instance) {
                    starters.push(instance);
                }
            }
        }
    }
    for (const starter of starters) {
        // console.log(`start ${starter.name}`)
        starter.start(app);
    }
}

export function destroy() {
    for (const starter of starters) {
        console.log(`destroy ${starter.name}`)
        if ("destroy" in starter && _.isFunction(starter["destroy"])) {
            starter.destroy();
        }
    }
}
