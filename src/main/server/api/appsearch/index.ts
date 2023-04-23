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

export function getApps() {
    return new Promise((resolve, reject) => appservices.getApps(resolve, reject, ""));
}
export function isInstalled(appName) {
    return new Promise((resolve, reject) => appservices.getApps(resolve, reject, appName));
}