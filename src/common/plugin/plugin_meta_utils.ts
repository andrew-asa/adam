import { ThirdPlugin } from "../core/plugins";


/**
 * 关闭插件的时候是否保存页面
 */
export function closeCachePage(plugin: ThirdPlugin | undefined):boolean {
    return plugin && plugin.ext && plugin.ext.settings && plugin.ext.settings.closeCachePage
}