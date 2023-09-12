import exp from "constants";

/**
 * 服务提供者
 */
export interface ServicesProvider {

}


/**
 * DB操作回应
 */
export interface DocRes {
    /**
     * 文档名字
     */
    name: string;
    ok?: boolean;
    reason?: string;
    data?: any
}

/**
 * 搜索模式 | 提问模式 | 浏览器模式
 */
export type Mode = 'search' | 'question' | 'browser'
export const Modes = {
    search: 'search',
    question: 'question',
    browser: 'browser'
} 