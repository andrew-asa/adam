import { isMacOS, isWindows, isLinux } from "../../../common/common_const";
import { AppServices } from "./AppServices";
import { LinuxAppServices } from "./linux/LinuxAppServices";
import { MacAppServices } from "./mac/MacAppServices";
import { WindowAppServices } from "./win/WindowAppServices";

let appservices: AppServices
if (isMacOS) {
    appservices = new MacAppServices();
} else if (isWindows) {
    appservices = new WindowAppServices();
} else if (isLinux) {
    appservices = new LinuxAppServices();
}
/**
 * 获取所有插件
 */
export function getPlugins() {
    return getApps()
}
/**
 * 获取所有系统应用
 */
export function getApps() {
    return new Promise((resolve, reject) => appservices.getApps(resolve, reject, ""));
}
/**
 * 判断应用是否安装
 */
export function isInstalled(appName) {
    return new Promise((resolve, reject) => appservices.getApps(resolve, reject, appName));
}
/**
 * 打开应用
 */
export function openApp(app: any): any {
    return appservices.openApp(app);
}