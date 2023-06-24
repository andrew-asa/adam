const stores: { [key: string]: any } = {}

export function registerStore(name: string, obj: any) {
    stores[name] = obj
}

export function getStore(name: string) {
    return stores[name]
}
