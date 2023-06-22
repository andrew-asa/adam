import { SystemApp } from "@/common/core/plugins";
import { AppServices } from "../AppServices";

export class WindowAppServices implements AppServices {
    openApp(app: SystemApp) {
        throw new Error("Method not implemented.");
    }
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}