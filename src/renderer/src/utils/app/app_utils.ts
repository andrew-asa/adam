/**
 * @description 是否是node环境
 * @returns {boolean}
 */
export function isNodeEnv(): boolean {
    return typeof global !== "undefined"
}