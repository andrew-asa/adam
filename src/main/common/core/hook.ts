const container: Record<string, any[]> = {}

function updateVersion(items: any) {
    items._version = (items._version || 0) + 1
}

export function get(type: string): any[] {
    return [...(container[type] || [])]
}

export function getRaw(type: string): (any[] & { _version: number }) | undefined {
    return container[type] as any[] & { _version: number }
}

export function register(type: string, item: any) {
    if (!container[type]) {
        container[type] = []
    }

    updateVersion(container[type])
    container[type].push(item)
}

export function remove(type: string, item: any) {
    if (container[type]) {
        const idx = container[type].indexOf(item)
        if (idx > -1) {
            container[type].splice(idx, 1)
        }
        updateVersion(container[type])
    }
}

export function removeWhen(type: string, when: (item: any) => boolean) {
    if (container[type]) {
        const items = container[type]
        for (let i = items.length - 1; i >= 0; i--) {
            if (when(items[i])) {
                items.splice(i, 1)
                updateVersion(container[type])
            }
        }
    }
}

export function removeAll(type: string) {
    if (container[type]) {
        container[type].length = 0
        updateVersion(container[type])
    }
}

/**
 * Register a hook.
 * @param type
 * @param fun
 * @param once
 */
export function registerHook(type: string, fun: Function, once = false) {
    register(type, { fun, once })
}

/**
 * Remove a hook.
 * @param type
 * @param fun
 */
export function removeHook(type: string, fun: Function) {
    removeWhen(type, item => item.fun === fun)
}

/**
 * Trigger a hook.
 * @param type
 * @param arg
 * @returns
 */
export async function triggerHook(type: string, arg: undefined, options: { breakable: true }): Promise<void>
export async function triggerHook(type: string): Promise<void>
export async function triggerHook(type: string, arg: any): Promise<void>
export async function triggerHook(type: string, arg: any, options: { breakable: true, ignoreError?: boolean }): Promise<boolean>
export async function triggerHook(type: string, arg: any, options?: { breakable?: false, ignoreError?: boolean }): Promise<void>
export async function triggerHook(type: string, arg?: any, options?: { breakable?: boolean, ignoreError?: boolean }): Promise<boolean | void> {
    const items: any[] = get(type)
    for (const { fun, once } of items) {
        once && removeHook(type, fun)
        try {
            if (options?.breakable) {
                if (await fun(arg)) {
                    // Logger.getLogger('hook').debug('triggerHook', 'break', fun)
                    return true
                }
            } else {
                fun(arg)
            }
        } catch (error) {
            if (options?.ignoreError) {
                console.warn('triggerHook', error)
            } else {
                throw error
            }
        }
    }

    if (options?.breakable) {
        return false
    }
}
