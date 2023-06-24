export interface plugin_ext {
    [key: string]: any
}
export interface AdamPlugin {
    /**
     * 
     * id
     */
    name: string;
    desc: string;
    icon: string;
    path: string;
    keywords: string[];
    type: 'app' | 'web' | 'code';
    version: string;
    ext?: plugin_ext
}

export interface option extends AdamPlugin {

}

export interface SystemApp extends AdamPlugin {
    type: 'app';
}
export interface AdamCode extends AdamPlugin {
    type: 'code';
}
export interface AdamWeb extends AdamPlugin {
    type: 'web';
}
export interface ThirdPluginFeature {
    /**
     * 代码
     */
    code: string
    /**
     * 解释
     */
    explain: string
    /**
     * 触发命令列表
     */
    cmds: any[]
}
/**
 * 第三方插件
 */
export interface ThirdPlugin {
    /**
     * 相当于id
     */
    name: string;
    /**
    * 插件名字
    */
    pluginName: string;
    /**
     * 简介
     */
    description: string;
    /**
     * 作者
     */
    author?: string;
    version: string;
    /**
     * 主入口文件
     */
    main?: string;
    /**
     * 主页
     */
    homePage?: string;
    /**
     * 图标
     */
    logo?: string;
    /**
     * 预先加载文件
     */
    preload?: string;
    /**
     * 特征
     */
    features?: Array<ThirdPluginFeature>
    isloading?: boolean
    isdownload?: boolean
}

/**
 * 第三方插件管理器
 */
export interface ThirdPluginManager{
    /**
     * 安装
     * @param plugin 
     */
    install(plugin: ThirdPlugin): void
    /**
     * 卸载
     * @param plugin 
     */
    uninstall(plugin: ThirdPlugin): void
}
