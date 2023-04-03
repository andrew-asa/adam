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




