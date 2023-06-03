import { AppServices } from "../AppServices";

export class LinuxAppServices implements AppServices {
    openApp(app: app) {
        throw new Error("Method not implemented.");
    }
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}