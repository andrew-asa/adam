import { PluginExtMessage, ThirdPlugin } from "@/common/core/plugins"

export function copyThirdPlugin(plugin: ThirdPlugin, isCopyExt = true): ThirdPlugin {
    return {
        name: plugin.name,
        pluginName: plugin.pluginName,
        pluginType: plugin.pluginType,
        description: plugin.description,
        logo: plugin.logo,
        main: plugin.main,
        version: plugin.version,
        ext: isCopyExt ? copyExt(plugin.ext) : {}
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

function copyExt(ext: PluginExtMessage): any {
    return ext ? {} : {
        code: ext.code,
        playload: ext.playload,
        type: ext.type,
        adapterEngine: ext.adapterEngine,
    }
}