/**
 * 内置钩子函数
 */
export type BuildInHookTypes = {
    /**
     * 应用启动
     */
    STARTUP: never,
}

/**
 * 内置Ioc类型
 */
export type BuildInIOCTypes = { [key in keyof BuildInHookTypes]: any; } & {

}