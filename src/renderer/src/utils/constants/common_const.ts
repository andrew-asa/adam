const _window = window as any

export const nodeProcess: NodeJS.Process = window && (window.process || _window.nodeProcess)
export const nodeModule = window && (window.module || _window.nodeModule)
export const nodeRequire = window && (window.require || _window.nodeRequire)

export const isElectron = !!(nodeProcess?.versions?.electron)
export const isMacOS = /macintosh|mac os x/i.test(navigator.userAgent)
export const isWindows = /win64|win32|wow64|wow32/i.test(navigator.userAgent)


export const db_keys = {
    /**
     * 搜索配置
     */
    search_configure: "search_configure"
}

