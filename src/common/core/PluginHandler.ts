export interface PluginHandler {
    /**
     * 是否需要处理
     */
    needHandle(plugin: plugin): boolean
    /**
     * 进行处理
     */
    handle(plugin: plugin): void
}