export interface Renderer {
    /**
     * 发信息
     * @param channel
     * 
     */
    send(channel: string, data: any): void;
    /**
     * 异步发消息
     */
    sendSync(channel: string, data: any): void;
    /**
     * 方法调用
     */
    invoke(channel: string, data: any): any
}