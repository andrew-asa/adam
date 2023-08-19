/**
 * 渲染消息
 */
export const renderer_msg_name = "renderer-msg-trigger"

/**
 * 方法调用信息
 */
export const renderer_fun_call_msg_name = "renderer-fun-call-msg-trigger"
/**
 * 后端端口
 */
export const backendpor = 3333
/**
 * 提供的api url
 */
export const api_urls = {
    // 主页
    home: "/",
    // 获取系统已经安装的应用
    get_apps: "/apps/get",
    // 获取文件
    get_file: "/file",
    // 获取所有插件
    get_plugin_list: "/plugin/list",
    // 安装插件
    load_plugin: "/plugin/load",
    // 卸载插件
    unload_plugin: "/plugin/unload",
    // 打开插件
    open_plugin: "/plugin/open",
    // 关闭插件
    close_plugin: "/plugin/close",
}


/**
 * 默认本地地址
 */
export const default_host = "http://127.0.0.1";
/**
 * 默认url前缀
 */
export const default_url_prefix = "/api";
/**
 * 默认端口
 */
export const default_port = backendpor;


/**
 * 常用的正则
 */
export const regs = {
    http_or_https: /^(http|https):\/\/([\w.]+\/?)\S*/ig
}





export const DECODE_KEY = {
    Backspace: "Backspace",
    Tab: "Tab",
    Enter: "Enter",
    MediaPlayPause: "MediaPlayPause",
    Escape: "Escape",
    Space: "Space",
    PageUp: "PageUp",
    PageDown: "PageDown",
    End: "End",
    Home: "Home",
    ArrowLeft: "Left",
    ArrowUp: "Up",
    ArrowRight: "Right",
    ArrowDown: "Down",
    PrintScreen: "PrintScreen",
    Insert: "Insert",
    Delete: "Delete",
    Digit0: "0",
    Digit1: "1",
    Digit2: "2",
    Digit3: "3",
    Digit4: "4",
    Digit5: "5",
    Digit6: "6",
    Digit7: "7",
    Digit8: "8",
    Digit9: "9",
    KeyA: "A",
    KeyB: "B",
    KeyC: "C",
    KeyD: "D",
    KeyE: "E",
    KeyF: "F",
    KeyG: "G",
    KeyH: "H",
    KeyI: "I",
    KeyJ: "J",
    KeyK: "K",
    KeyL: "L",
    KeyM: "M",
    KeyN: "N",
    KeyO: "O",
    KeyP: "P",
    KeyQ: "Q",
    KeyR: "R",
    KeyS: "S",
    KeyT: "T",
    KeyU: "U",
    KeyV: "V",
    KeyW: "W",
    KeyX: "X",
    KeyY: "Y",
    KeyZ: "Z",
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    Semicolon: ";",
    Equal: "=",
    Comma: ",",
    Minus: "-",
    Period: ".",
    Slash: "/",
    Backquote: "`",
    BracketLeft: "[",
    Backslash: "\\",
    BracketRight: "]",
    Quote: "'",
};

/**
 * 服务提供者名字
 */
export const services_name = {
    /**
     * db 管理类
     */
    db_services: "db_services",
    /**
     * 提供electron相关操作
     */
    electron_services: "electron_services",
    /**
     * 插件相关
     */
    plugin_services: "plugin_services",

    /**
     * 应用控制器相关服务
     */
    app_controller_services: "app_controller_services",
}

/**
 * 暴露的全局变量
 */
export const export_stores_name = {
    current_plugin: "current_plugin",
    current_plugin_name: "current_plugin_name",

    renderer: {
        plugin_stores: "renderer_plugin_stores",
    }

}

/**
 * 数据存储前缀
 */
export const db_prefix = {
    plugin_db: "plugin_db",
    plugin_settins: "plugin_settings",
    app_db: "app_db",
}
