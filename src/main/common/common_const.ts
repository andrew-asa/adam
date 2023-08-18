import os from "os";
import path from "path";
export const isLinux = process.platform === "linux";
export const isMacOS = process.platform === "darwin";
export const isWindows = process.platform === "win32";
export const isProduction = process.env.NODE_ENV !== "development";
export const isDev = process.env.NODE_ENV === "development";
// 用户主目录
export const USER_HOME_PATH = os.homedir() || process.env.USERPROFILE || process.env.HOME || "";
// app主目录
export const CONFIGURE_DIR = path.join(USER_HOME_PATH, "./.adam");
// 插件安装目录
export const PLUGINS_INSTALL_DIR = path.join(CONFIGURE_DIR, "./plugins");
/**
 * 插件父目录
 */
export const PLUGIN_BASE_DIR = path.join(PLUGINS_INSTALL_DIR, "./node_modules");
/**
 * 默认插件仓库地址
 */
export const DEFAULT_PLUGIN_REGISTRY = "https://registry.npm.taobao.org";
// 配置文件目录
export const CONFIGURE_PATH = "./adam-configure.json";

// 默认配置信息
export const DEFAULT_CONFIG = {
  version: "1.0.0",
  perf: {
    shortCut: {
      showAndHidden: "Option+R",
      separate: "Ctrl+D",
      quit: "Shift+Escape",
    }
  }
}
/**
 * LOGGER 文件相关
 */
// log文件路径
export const LOGGER_PATH = path.join(CONFIGURE_DIR, "./adam_log.txt");
// log文件最大容量1MB
export const MAX_LOG_SIZE = 1024 * 1024;

/**
 * @Author andrew
 * @Description 用户应用空间下的文件列表
 */
export const apps_user_files = {
  /**
   * 应用列表文件
   */
  apps_list: "apps_list.json",
  /**
   * 应用图标缓存文件
   */
  apps_icon_cache_dir: "cache/ProcessIcon",
}
/**
 * 全局变量名字
 */
export const stores_name = {
  /**
   * 当前正在运行的插件，指挂载在搜索窗口上面的插件
   */
  current_plugin_view: 'current_plugin_view',


  /**
   * 获取renderer_api
   */
  app_renderer_api: "app_renderer_api",

  /**
   * 主窗口
   */
  app_main_window: "app_main_window",
  /**
   * app
   */
  app: "app",
  main_app: "main_app",
  /**
   * service提供者
   */
  services: {
    /**
     * 数据库
     */
    db: "store_db_services",
    /**
     * electron 相关
     */
    electron: "store_electron_services",
    /**
     * 插件相关
     */
    plugin: "store_plugin_services",
    /**
     * app相关
     */
    app: "app_controller_services",
  }
}
/**
 * 全局函数名字
 */
export const actions_name = {
  /**
   * 主窗口
   */
  get_main_window: "get_main_window",
  /**
   * 应用程序
   */
  get_app: "get_app",

  /**
   * Electron原生的app对象
   */
  get_main_app: "get_main_app"
}
/**
 * 默认窗口高度
 */
export const default_window_height = 60
/**
 * 默认插件窗口宽度
 */
export const default_plugin_window_height = 540



