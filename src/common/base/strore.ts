const stores: { [key: string]: any } = {}

/**
 * 注册全局变量
 */
export function registerStore(name: string, obj: any) {
    stores[name] = obj
}

export function getStore(name: string): any {
    return stores[name]
}
