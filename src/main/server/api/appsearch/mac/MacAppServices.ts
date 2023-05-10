import { backupAppList, readAppListFromFile } from "@/main/common/utils/user_files_utils";
import { AppServices } from "../AppServices";
import { spawn } from "child_process";
const plist = require('plist');
export class MacAppServices implements AppServices {
    private apps;
    resolveApps(items, resolve, filterByAppName) {
        if (!filterByAppName) return resolve(items);
        return resolve(
            // installedApps._items.filter((apps) => apps._name === filterByAppName)
            //     .length !== 0
            items.filter((apps) => apps.name === filterByAppName)
                .length !== 0
        );
    }
    getApps(resolve, reject, filterByAppName = false) {
        if (this.apps) {
            return this.resolveApps(this.apps, resolve, filterByAppName)
        } else {
            // const fapps = readAppListFromFile()
            // // @ts-ignore
            // if (fapps && fapps.time) {
            //     // @ts-ignore
            //     return this.resolveApps(apps.apps, resolve, filterByAppName)
            // }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let resultBuffer = new Buffer.from([]);

        const profileInstalledApps = spawn("/usr/sbin/system_profiler", [
            "-xml",
            "-detailLevel",
            "mini",
            "SPApplicationsDataType",
        ]);

        profileInstalledApps.stdout.on("data", (chunckBuffer) => {
            resultBuffer = Buffer.concat([resultBuffer, chunckBuffer]);
        });

        profileInstalledApps.on("exit", (exitCode) => {
            if (exitCode !== 0) {
                reject([]);
                return;
            }

            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const [installedApps] = plist.parse(resultBuffer.toString());
                const items = installedApps._items.map((item) => {
                    return {
                        name: item._name,
                        path: item.path,
                        version: item.version,
                    }
                })
                this.apps = items
                // backupAppList(items);
                // if (!filterByAppName) return resolve(installedApps._items);
                this.resolveApps(items, resolve, filterByAppName);
            } catch (err) {
                reject(err);
            }
        });

        profileInstalledApps.on("error", (err) => {
            reject(err);
        });
    }
}