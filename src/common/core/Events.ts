export const events = {
    plugin: {
        /**
         * 插件进入
         */
        plugin_enter: "plugin_enter",
        /**
         * 插件就绪
         */
        plugin_ready: "plugin_ready",

        /**
         * 插件退出
         */
        plugin_out: "plugin_out",
        /**
         * 输入改变
         */
        input_change: "input_change",
        /**
         * 按键按下
         */
        keydown: "keydown",
    },
    menus: {
        /**
         * 点击菜单
         */
        menu_click: "menu_click",
    },
    renderer: {
        search: {
            // 后端通知前端关闭插件
            close_plugin: "renderer_search_close_plugin",
        }
    }
}