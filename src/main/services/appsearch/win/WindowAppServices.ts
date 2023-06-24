import { SystemApp } from "@/common/core/plugins";
import { AbstractAppServices } from "../AbstractAppServices";

export class WindowAppServices extends AbstractAppServices {
    openApp(app: SystemApp) {
        throw new Error("Method not implemented.");
    }
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}