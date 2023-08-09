import { app, clipboard, dialog, nativeImage, shell } from "electron";
import { ServicesProvider } from "@/common/core/types";
import _ from "lodash";
export class ElectronServices implements ServicesProvider {
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
}