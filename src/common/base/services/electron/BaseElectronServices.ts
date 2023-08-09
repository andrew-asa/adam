import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";
import { BaseServices } from "../BaseServices";

/**
 * @example ctx.services.electron.xxx
 */
export class BaseElectronServices extends BaseServices {
    serviceName: string = services_name.electron_services;
    /**
     * @description 文件夹中显示文件
     * @param filePath 文件路径
     */
    showItemInFolder(filePath: string) {
        return this.invoke("showItemInFolder", filePath);
    }
    /**
     * @description  删除文件
     * @param path 文件路径
     */
    trashItem(path: string) {
        return this.invoke("trashItem", path);
    }
    /**
     * @description  系统默认程序打开文件
     * @param filePath 文件路径
     */
    openPath(filePath: string) {
        return this.invoke("openPath", filePath);
    }
    /**
     * @description 复制本地图片到剪贴板
     * @param path 文件路径
     */
    copyImageToClipboardFromPath(path: string) {
        return this.invoke("copyImageToClipboardFromPath", path);
    }
    /**
     * @description 粘贴板写入文本
     */
    writeText(text: string) {
        return this.invoke("writeText", text);
    }

    /**
     * @description 从剪贴板读取文本
     */
    readText(type?: 'selection' | 'clipboard') {
        this.invoke("readText", type);
    }

    /**
     * @description 获取系统指定文件目录
     */
    getPath(name: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') {
        return this.invoke("getPath", name);
    }
    /**
     * @description 是否是打包环境
     * @returns 
     */
    isProduction() {
        return this.invoke("isProduction", {});
    }
/**
     * @description 是否是生产环境
     * @returns 
     */
    isDevEnv() {
        return this.invoke("isDevEnv", {});
    }

    /**
     * @description 打开文件对话框
     * @param OpenDialogOptions
     */
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
        return this.invoke("showOpenDialog", OpenDialogOptions);
    }
}
