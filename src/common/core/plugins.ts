export interface PluginExtMessage {
    [key: string]: any
    /**
     * 正在加载
     */
    isloading?: boolean
    /**
     * 是否已经完成下载
     */
    isdownload?: boolean
    /**
     * 适配处理引擎
     */
    adapterEngine?: string
}

export interface ThirdPluginFeature {
    /**
     * 代码
     */
    code?: string
    /**
     * 解释
     */
    explain?: string
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
    * 插件名字 可读插件名
    */
    pluginName: string;
    /**
     * 简介
     */
    description: string;
    /**
     * 插件类型
     */
    pluginType: 'app' | 'web' | 'code' | 'ui';
    /**
     * 作者
     */
    author?: string;
    /**
     * 版本
     */
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
    features?: Array<ThirdPluginFeature>;
    /**
     * 关键字，如系统app只需要搜索关键字而无需搜索features
     */
    keywords?: string[];
    /**
     * 额外的信息
     */
    ext?: PluginExtMessage
}

/**
 * 第三方插件管理器
 */
export interface ThirdPluginManager {
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

    /**
     * 列出所有管理的插件
     */
    listAllPlugin(): ThirdPlugin[]
}

export interface AdamPlugin extends ThirdPlugin {

}


/**
 * 系统app
 */
export interface SystemApp extends AdamPlugin {
    pluginType: 'app';
}
export interface AdamCode extends AdamPlugin {
    pluginType: 'code';
}
export interface AdamWeb extends AdamPlugin {
    pluginType: 'web';
}
