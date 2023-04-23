import { AppServices } from "../AppServices";

export class WindowAppServices implements AppServices {
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}