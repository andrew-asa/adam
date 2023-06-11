export interface PluginHandler {
    /**
     * 是否需要处理
     */
    needHandle(plugin: plugin): boolean
    /**
     * 打开插件
     */
    open(plugin: plugin, ext?: any): void
    /**
     * 关闭插件
     */
    close(plugin: plugin, ext?: any): void
}