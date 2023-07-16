/**
 * 插件设置
 */
export interface PluginSettings {
    [key: string]: any
    /**
     * 退出插件的时候是否保存页面 | 只是隐藏而已，并不是真正进行销毁
     */
    closeCachePage?: boolean
}
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
    adapterEngine?: string,
    /**
     * 设置
     */
    settings?: PluginSettings
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
    description?: string;
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
    version?: string;
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
 * 第三方插件适配
 */
export interface ThirdPluginAdapter {
    /**
    * 是否需要处理
    */
    needHandle(plugin: ThirdPlugin): boolean
}

/**
 * 第三方插件管理器
 */
export interface ThirdPluginManager extends ThirdPluginAdapter {


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

/**
 * 第三方插件运行类
 */
export interface ThirdPluginRunner extends ThirdPluginAdapter {
    /**
     * 进入插件之前进行适配
     */
    loadMain(plugin: ThirdPlugin, ext: any): void

    /**
     * 卸载插件之前操作
     */
    unloadMain(plugin: ThirdPlugin,ext:any): void

    /**
     * session的预处理文件
     */
    getPreloads(plugin: ThirdPlugin): string[];
}




export interface AdamPlugin extends ThirdPlugin {

}


/**
 * 系统app
 */
export interface SystemApp extends AdamPlugin {
    pluginType: 'app';
    // 应用路径
    path: string
}
export interface AdamCode extends AdamPlugin {
    pluginType: 'code';
}
export interface AdamWeb extends AdamPlugin {
    pluginType: 'web';
}
