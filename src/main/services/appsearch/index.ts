import { SystemApp } from "@/common/core/plugins";
import { isMacOS, isWindows, isLinux } from "../../common/common_const";
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
export function openApp(app: SystemApp): any {
    return appservices.openApp(app);
}
/**
 * 打开文件
 */
export function openFile(path:string) {
    return appservices.openFile(path);
}