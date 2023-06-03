export interface PluginHandler {
    handler(plugin: plugin, store: any): void
    needHandler(plugin: plugin): boolean
}