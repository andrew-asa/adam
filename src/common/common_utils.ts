import { api_urls, default_host, default_port, default_url_prefix } from "../common/common_const";
import { SystemApp, ThirdPlugin } from "./core/plugins";
export function getUrl(url: string, host: string = default_host, port = default_port, prefix: string = default_url_prefix) {
    return `${host}:${port}${prefix}${url}`;
}
export function getAppIconPath(path) {
    return `${getUrl(api_urls.get_file)}?path=${path}`;
}

export function copyThirdPluginToAppPlugin(plugin: ThirdPlugin): SystemApp {
    return {
        name: plugin.name,
        pluginName: plugin.pluginName,
        description: plugin.description,
        pluginType: 'app',
        logo: plugin.logo,
        path: plugin.main || '',
        version: plugin.version,
    }
}
/**
console.log(extend(
    {},
    { "a": 1, "b": 4, "d": { "e": "ae", h: { e: "ae" }, "m": { e: "am" }, f: { e: 2 } } },
    { "b": 2 },
    { "c": 3, "d": { "e": "ed", h: { e: "ce" } } })
);
console.log(extend(
    true,
    {},
    { "a": 1, "b": 4, "d": { "e": "ae", h: { e: "ae" }, "m": { e: "am" }, f: { e: 2 } } },
    { "b": 2 },
    { "c": 3, "d": { "e": "ed", h: { e: "ce" } } })
);
{ a: 1, b: 2, d: { e: 'ed', h: { e: 'ce' } }, c: 3 }
{
  a: 1,
  b: 2,
  d: { e: 'ed', h: { e: 'ce' }, m: { e: 'am' }, f: { e: 2 } },
  c: 3
}
 */
export function extend(...targets) {
    var src, copyIsArray, copy, name, options, clone,
        target = targets[0] || {},
        i = 1,
        length = targets.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        target = targets[1] || {};

        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if (length === i) {
        // @ts-ignore
        target = this;
        --i;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if ((options = targets[i]) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];

                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

export function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isFunction(obj) {
    return typeof obj === "function";
}

export function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}

export function isTrueOrString(value) {
    return (typeof value === 'string' && value === 'true') || (typeof value === 'boolean' && value === true)
}


