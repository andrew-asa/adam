import { ThirdPlugin } from "@/common/core/plugins"
import { PLUGIN_BASE_DIR } from "@/main/common/common_const"
import path from "path"

/**
 * 获取插件文件路径
 */
export function getPluginFilePath(plugin: ThirdPlugin, fileName): string {
    if (fileName) {
        const dir = path.join(PLUGIN_BASE_DIR, plugin.name)
        return path.join(dir, fileName)
    }
    return ""
}