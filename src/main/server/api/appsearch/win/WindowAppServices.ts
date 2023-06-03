import { AppServices } from "../AppServices";

export class WindowAppServices implements AppServices {
    openApp(app: any) {
        throw new Error("Method not implemented.");
    }
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}