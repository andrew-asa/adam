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