export const ctx = {
    app: {
        controller: {

        }
    },
    plugin: {
        hooks: {
            /**
             * 插件进入
             */
            onPluginEnter: () => { },
            /**
             * 插件退出
             */
            onPluginReady: () => { },
            /**
             * 插件退出
             */
            onPluginOut: () => { },
        }
    }
}
let init = false
export function start_plugin_enginer_bridge() {
    console.log('start_plugin_enginer_bridge')
    if (!init) {
        init = true
        // @ts-ignore
        window.ctx = ctx
    }
}
