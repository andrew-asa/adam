import { regs } from "@/common/common_const"
import { ThirdPlugin } from "@/common/core/plugins"
import { PLUGIN_BASE_DIR } from "@/main/common/common_const"
import { readFileObject } from "@/main/common/utils/user_files_utils"
import path from "path"

/**
 * 获取插件文件路径
 */
export function getPluginFilePath(pluginName: string, fileName): string {
    if (fileName) {
        const dir = path.join(PLUGIN_BASE_DIR, pluginName)
        return path.join(dir, fileName)
    }
    return ""
}

export function getPluginFileUrl(pluginName: string, fileName) {
    if (fileName) {
        return `files:///plugins/node_modules/${pluginName}/${fileName}`
    }
    return ""
}

export function parseInstallPlugin(baseDir: string): ThirdPlugin[] {
    const pp = `${baseDir}/package.json`
    const pdata = readFileObject(pp)
    var plugins: ThirdPlugin[] = [];
    if (pdata.dependencies) {
        const deps = Object.keys(pdata.dependencies);
        deps.forEach(dep => {
            const plugin_json_path = getPluginFilePath(dep, "plugin.json")
            const plugin_json = readFileObject(plugin_json_path)
            if (plugin_json.name) {
                const logo = plugin_json.logo
                if (logo && !logo.match(regs.http_or_https)) {
                    plugin_json.logo = getPluginFileUrl(dep, logo)
                }
                plugins.push(plugin_json as ThirdPlugin)
            }
        })
    }
    return plugins
}

export function parseAppPlugin(): ThirdPlugin[] {
   
    var plugins: ThirdPlugin[] = [];
    
    return plugins
}
