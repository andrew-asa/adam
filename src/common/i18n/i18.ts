import { Language, translate, mergeLanguage as _mergeLanguage } from "./index"

/**
 * 获取当前系统语言
 */
export function getCurrentLanguage(): Language {
    return "cn"
}

/**
 * @param path 路径
 * @param args 参数
 */
export function t(path: string, ...args: string[]) {
    return translate(getCurrentLanguage(), path, ...args)
}

/**
 * Merge natural language strings
 * @param lang
 * @param nls
 */
export function mergeLanguage(lang: Language, nls: Record<string, any>) {
    _mergeLanguage(lang, nls)
}