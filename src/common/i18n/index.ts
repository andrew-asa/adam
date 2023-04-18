
import get from 'lodash/get'
import merge from 'lodash/merge'
import en from "./langs/en"
import cn from "./langs/cn"
const languages = {
    en,
    cn,
}
const defaultLang = cn
export type Language = keyof typeof languages
/**
 * 获取文本
 * @param data 数据
 * @param path 路径 
 * @param args 参数
 * 
 * @example {name: '张三',app:{name:adam}} => 
 *                                         name=>'张三'
 *                                         app.name=>{name:adam}        
 */
export function getText(data: Record<string, any>, path: string, ...args: string[]): string {
    const text: string = get(data, path, get(defaultLang, path, ''))
    if (args.length < 1) {
        return text
    }

    let idx = -1
    return text.replace(/%s/g, () => {
        idx++
        return args[idx] || ''
    })
}
/**
 * 国际化文本翻译
 */
export function translate(lang: Language, path: string, ...args: string[]) {
    const language = languages[lang] || defaultLang
    return getText(language, path, ...args)
}
/**
 * 文本合并
 */
export function mergeLanguage(lang: Language, nls: Record<string, any>) {
    languages[lang] = merge(languages[lang], nls)
}