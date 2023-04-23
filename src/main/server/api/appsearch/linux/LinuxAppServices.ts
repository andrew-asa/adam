import { AppServices } from "../AppServices";

export class LinuxAppServices implements AppServices {
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
}