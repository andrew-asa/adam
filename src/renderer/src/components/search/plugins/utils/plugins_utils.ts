import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins"

export function copyPlugin(plugin: AdamPlugin): AdamPlugin {
    return {
        name: plugin.name,
        desc: plugin.desc,
        icon: plugin.icon,
        path: plugin.path,
        keywords: copyKeywords(plugin.keywords),
        type: plugin.type,
        version: plugin.version,
        ext: plugin.ext
    }
}


export function copyThirdPlugin(plugin: ThirdPlugin): ThirdPlugin {
    return {
        name: plugin.name,
        pluginName: plugin.pluginName,
        description: plugin.description,
        logo: plugin.logo,
        main: plugin.main,
        version: plugin.version,
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