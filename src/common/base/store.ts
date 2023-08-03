const stores: { [key: string]: any } = {}

/**
 * 注册全局变量
 */
export function registerStore(name: string, obj: any) {
    stores[name] = obj
}

export function deleteStore(name: string) {
    delete stores[name]
}

export function getStore(name: string): any {
    return stores[name]
}

export function getStores(): { [key: string]: any } {
    return stores
}
