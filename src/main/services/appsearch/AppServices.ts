export interface AppServices {
    /**
     * @param resolve 成功回调函数
     * @param reject 失败回调函数
     * @param filterByAppName 是否过滤指定app名称
     * @returns [{
     *     name: string,    // 应用名字
     *     path: string,    // 应用地址
     *     desc: string,    // 应用地址
     *     pluginType: app, // 插件类型
     *     icon: image://,  // 应用图标地址 相对于 [.adam]的路径
     *     version: string, // 应用版本
     *     keywords: []     // 搜索关键词
     * }]
     */
    getApps: (resolve, reject, filterByAppName) => any;
    /**
     * 打开应用程序
     */
    openApp(app: app): any
}
export interface PluginServices {
    /**
     * @param resolve 成功回调函数
     * @param reject 失败回调函数
     * @param filterByAppName 是否过滤指定app名称
     * @returns [{
     *     name: string,    // 应用名字
     *     path: string,    // 应用地址
     *     icon: image://,  // 应用图标地址 相对于 [.adam]的路径
     *     version: string, // 应用版本
     *     keywords: []     // 搜索关键词
     * }]
     */
    getPlugins: (resolve, reject) => any;
}