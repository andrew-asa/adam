export declare const ctx: {
    app: {
        controller: any;
    };
    plugin: {
        on(name: string, fn: Function): void;
        trigger(name: string, ...args: any[]): void;
    };
    action: any;
};
export type Ctx = typeof ctx;