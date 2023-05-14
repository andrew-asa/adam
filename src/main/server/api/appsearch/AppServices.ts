export interface AppServices {
    /**
     * @param resolve 成功回调函数
     * @param reject 失败回调函数
     * @param filterByAppName 是否过滤指定app名称
     * @returns [{
     *     name: string,
     *     path: string,
     *     icon: image://,
     *     version: string,
     *     value: "plugin",
     *     pluginType: "app",
     *     keywords: []
     * }]
     */
    getApps: (resolve, reject, filterByAppName) => any;

    
}