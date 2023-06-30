import { PluginExtMessage, ThirdPlugin } from "../core/plugins";


/**
 * 关闭插件的时候是否保存页面
 */
export function closeCachePage(plugin: ThirdPlugin|undefined):boolean {
    // @ts-ignore
    return plugin && plugin.ext && plugin.ext.settings && plugin.ext.settings.closeCachePage
}

export function copyThirdPlugin(plugin: ThirdPlugin, isCopyExt = true): ThirdPlugin {
    return {
        name: plugin.name,
        pluginName: plugin.pluginName,
        pluginType: plugin.pluginType,
        description: plugin.description,
        logo: plugin.logo,
        main: plugin.main,
        version: plugin.version,
        ext: isCopyExt ? copyExt(plugin.ext) : {},
        preload: plugin.preload
    }
}

function copyKeywords(keywords: string[]): string[] {
    const r = []
    if (keywords) {
        keywords.forEach(k => {
            r.push(k)
        })
    }
    return r
}

function copyExt(ext: any): any {
    return ext ?  {
        code: ext.code,
        playload: ext.playload,
        type: ext.type,
        adapterEngine: ext.adapterEngine,
    }:{} 
}

