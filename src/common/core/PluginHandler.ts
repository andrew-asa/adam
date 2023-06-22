import { AdamPlugin } from "./plugins"

export interface PluginHandler {
    /**
     * 是否需要处理
     */
    needHandle(plugin: AdamPlugin): boolean
    /**
     * 打开插件
     */
    open(plugin: AdamPlugin, ext?: any): void
    /**
     * 关闭插件
     */
    close(plugin: AdamPlugin, ext?: any): void
}