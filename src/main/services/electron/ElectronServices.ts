import { app, clipboard, dialog, nativeImage, shell } from "electron";
import plist from "plist";
import fs, { Stats } from "fs";
import path from "path";
import ofs from "original-fs";
import { ServicesProvider } from "@/common/core/types";
import _ from "lodash";
import { isMacOS, stores_name } from "@/main/common/common_const";
import { getStore } from "@/common/base/store";
export class ElectronServices implements ServicesProvider {
    static servicesName: string = stores_name.services.electron
    static getServices(): ElectronServices {
        return getStore(ElectronServices.servicesName)
    }
    /**
     * 系统默认程序打开文件
     */
    openPath(filePath: string) {
        return shell.openPath(filePath)
    }
    /**
     * 文件夹中显示文件
     */
    showItemInFolder(filePath: string) {
        return shell.showItemInFolder(filePath)
    }
    /**
     * 删除文件
     */
    trashItem(path: string) {
        return shell.trashItem(path)
    }
    copyImageToClipboardFromPath(path: string) {
        const imageNativeObj = nativeImage.createFromPath(path);
        clipboard.writeImage(imageNativeObj);
    }
    writeText(text: string) {
        clipboard.writeText(text);
    }

    readText(type?: 'selection' | 'clipboard'): string {
        return clipboard.readText(type);
    }

    getPath(name: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'): string {
        return app.getPath(name)
    }
    /**
     * 是否是生产环境
     */
    isProduction(): boolean {
        return !!app.isPackaged
    }

    isDevEnv(): boolean {
        return !this.isProduction()
    }
    /**
     * 打开文件对话框
     */
    openFolderDialog(OpenDialogOptions: {
        title?: string;
        defaultPath?: string;
        buttonLabel?: string;
        filters?: {
            extensions: string[];
            name: string;
        }[];
        properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
        /**
         * Message to display above input boxes.
         *
         * @platform darwin
         */
        message?: string;
        /**
         * Create security scoped bookmarks when packaged for the Mac App Store.
         *
         * @platform darwin,mas
         */
        securityScopedBookmarks?: boolean;
    }) {
        const opt = _.extend({}, OpenDialogOptions, {
            properties: ['openDirectory']
        });
        return dialog.showOpenDialog(opt);
    }

    showOpenDialog(OpenDialogOptions: {
        title?: string;
        defaultPath?: string;
        buttonLabel?: string;
        filters?: {
            extensions: string[];
            name: string;
        }[];
        properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
        /**
         * Message to display above input boxes.
         *
         * @platform darwin
         */
        message?: string;
        /**
         * Create security scoped bookmarks when packaged for the Mac App Store.
         *
         * @platform darwin,mas
         */
        securityScopedBookmarks?: boolean;
    }) {
        return dialog.showOpenDialog(OpenDialogOptions);
    }


    getClipboardFiles(): {
        isFile: boolean,
        isDirectory: boolean,
        name: string,
        path: string
        [key: string]: any
    }[] {
        let fileInfo: any = []
        const empty_list = []
        if (isMacOS) {
            if (!clipboard.has("NSFilenamesPboardType")) return empty_list;
            const result = clipboard.read("NSFilenamesPboardType");
            if (!result) return empty_list;
            try {
                fileInfo = plist.parse(result);
            } catch (e) {
                return empty_list;
            }
        }
        if (!Array.isArray(fileInfo)) return empty_list;
        const target: any = fileInfo
            .map((p) => {
                let state = this.lstatSimpleSync(p)
                if (!state.exists) return false;
                return state
            })
            .filter(Boolean);
        return target;
    }

    lstatSync(path: string): {
        exists: boolean,
        state: any
    } {
        let ret = {
            exists: false,
            state: {}
        }
        if (fs.existsSync(path)) {
            ret.state = fs.lstatSync(path);
        }
        return ret
    }

    lstatSimpleSync(p: string): {
        exists: boolean,
        name: string,
        isFile: boolean,
        isDirectory: boolean,
        path: string,
        dir: string
        [key: string]: any
    } {
        const exist = fs.existsSync(p)
        const name = path.basename(p) || p
        var isFile = false
        var isDirectory = false
        var p = p
        var dir = path.dirname(p)
        if (exist) {
            let s = ofs.lstatSync(p)
            isFile = s.isFile()
            isDirectory = s.isDirectory()
        }
        return {
            exists: exist,
            name: name,
            isFile: isFile,
            isDirectory: isDirectory,
            path: p,
            dir: dir
        }
    }
}