import { AdamPlugin, ThirdPlugin } from "./plugins"

export interface PluginHandler {
    /**
     * 是否需要处理
     */
    needHandle(plugin: ThirdPlugin): boolean
    /**
     * 打开插件
     */
    open(plugin: ThirdPlugin, ext?: any): void
    /**
     * 关闭插件
     */
    close(plugin: ThirdPlugin, ext?: any): void
}