import { backupAppList, readAppListFromFile } from "@/main/common/utils/user_files_utils";
import { AppServices } from "../AppServices";
import fs from "fs";
import path from "path";
import os from "os";
import { nativeImage } from 'electron';

import { execSync, spawn } from "child_process";
import { keywords, translate } from "@/main/common/utils/translate";
import _ from "lodash";
import { CONFIGURE_DIR, apps_user_files } from "@/main/common/common_const";
import { createDir } from "@/main/common/utils/io_utils";
import { getAppIconPath } from "@/common/common_utils";
import { SystemApp } from "@/common/core/plugins";
import { AbstractAppServices } from "../AbstractAppServices";
const plist = require('plist');
export class MacAppServices extends AbstractAppServices {
    private apps;
    private icondir;


    private isZhRegex = /[\u4e00-\u9fa5]/
    constructor() {
        super();
        // this.icondir = path.join(os.tmpdir(), "ProcessIcon");
        this.icondir = path.join(CONFIGURE_DIR, apps_user_files.apps_icon_cache_dir);
        const exists = fs.existsSync(this.icondir);
        if (!exists) {
            createDir(CONFIGURE_DIR, apps_user_files.apps_icon_cache_dir);
        }
    }

    openApp(app: SystemApp) {
        if (!app.path) return
        const cmd = `open ${app.path.replace(/ /g, "\\ ") as string}`
        execSync(cmd);
    }
    async getAppIcon(
        appPath: string,
        name: string
    ) {
        try {
            const iconpath = path.join(this.icondir, `${name}.png`);
            const iconnone = path.join(this.icondir, `${name}.none`);
            const exists = fs.existsSync(iconpath);
            const existsnone = fs.existsSync(iconnone);
            if (exists) return true;
            if (existsnone) return false;
            const appName: string = appPath.split("/").pop() || "";
            const extname: string = path.extname(appName);
            const appSubStr: string = appName.split(extname)[0];
            const path1 = path.join(appPath, `/Contents/Resources/App.icns`);
            const path2 = path.join(appPath, `/Contents/Resources/AppIcon.icns`);
            const path3 = path.join(appPath, `/Contents/Resources/${appSubStr}.icns`);
            const path4 = path.join(
                appPath,
                `/Contents/Resources/${appSubStr.replace(" ", "")}.icns`
            );
            let iconPath: string = path1;
            if (fs.existsSync(path1)) {
                iconPath = path1;
            } else if (fs.existsSync(path2)) {
                iconPath = path2;
            } else if (fs.existsSync(path3)) {
                iconPath = path3;
            } else if (fs.existsSync(path4)) {
                iconPath = path4;
            } else {
                // 性能最低的方式
                const resourceList = fs.readdirSync(
                    path.join(appPath, `/Contents/Resources`)
                );
                const iconName = resourceList.filter(
                    (file) => path.extname(file) === ".icns"
                )[0];
                if (!iconName) {
                    fs.writeFileSync(iconnone, "");
                    return false;
                }
                iconPath = path.join(appPath, `/Contents/Resources/${iconName}`);
            }
            const img = await nativeImage.createThumbnailFromPath(iconPath, {
                width: 64,
                height: 64,
            });

            const base64Data = img.toDataURL().replace(/^data:.+;base64,/, '"');

            const result = Buffer.from(base64Data, "base64");

            fs.writeFile(iconpath, result, "base64", () => {
                // todo
                // console.log(`write ${iconpath}`);
            });

            return true;
        } catch (e) {
            return false;
        }
    }
    resolveApps(items, resolve, filterByAppName) {
        if (!filterByAppName) return resolve(items);
        return resolve(
            // installedApps._items.filter((apps) => apps._name === filterByAppName)
            //     .length !== 0
            items.filter((apps) => apps.name === filterByAppName)
                .length !== 0
        );
    }
    cacheApps(apps) {
        this.apps = apps
    }
    async addAppIconField(app) {
        if (await this.getAppIcon(app.path, app.name)) {
            // 设置地址
            const sf = path.join(
                apps_user_files.apps_icon_cache_dir,
                `${encodeURIComponent(app.name)}.png`
            );
            app.icon = getAppIconPath(sf);
        }
    }
    addAppTypeAndAction(app) {
        _.extend(app, {
            type: "app",
            // action: `open ${app.path.replace(/ /g, "\\ ") as string}`,
        })
    }
    addAppKeywordsAndNames(app) {
        {
            const appName: any = app.path.split("/").pop();
            const extname = path.extname(appName);
            const appSubStr = appName.split(extname)[0];
            const kws = [appSubStr, ...keywords(app.name)]
            _.extend(app, {
                keywords: kws
            })
        }
    }
    async fixAppsFields(orginApps) {
        let apps = orginApps
        apps = apps.filter((app: any) => {
            const extname = path.extname(app.path);
            return extname === ".app" || extname === ".prefPane";
        });
        for (const app of apps) {
            await this.addAppIconField(app);
            // todo getApp size
        }
        apps = apps.filter((app: any) => !!app.icon);
        apps = apps.map((app: any) => {
            this.addAppTypeAndAction(app);
            this.addAppKeywordsAndNames(app);
            return app
        })
        console.log(`fixAppsFields ${apps.length}`);
        this.cacheApps(apps)
        return apps
    }
    getApps(resolve, reject, filterByAppName = false) {
        if (this.apps) {
            return this.resolveApps(this.apps, resolve, filterByAppName)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let resultBuffer = new Buffer.from([]);
        this.evalCommand("/usr/sbin/system_profiler", [
            "-xml",
            "-detailLevel",
            "mini",
            "SPApplicationsDataType",
        ], {
            "data": (chunckBuffer) => {
                resultBuffer = Buffer.concat([resultBuffer, chunckBuffer]);
            },
            "exit": async (exitCode) => {
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
                    this.fixAppsFields(items).then(() => {
                        this.resolveApps(this.apps, resolve, filterByAppName);
                    })
                } catch (err) {
                    reject(err);
                }
            },
            "error": (err) => {
                reject(err);
            }
        })
    }

    openFile(path: string) {
        this.evalCommand("open", [path])
    }
}