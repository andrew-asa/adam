import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";

/**
 * electron 相关操作
 * ==> main/services/ElectronServices
 */
export class BaseElectronServices implements ServicesProvider {
    copyImageToClipboardFromPath(path: string) {
        return this.invoke("copyImageToClipboardFromPath", path);
    }
    writeText(text: string) {
        return this.invoke("writeText", text);
    }

    readText(type?: 'selection' | 'clipboard') {
        this.invoke("readText", type);
    }

    getPath(name: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') {
        return this.invoke("getPath", name);
    }

    isProduction() {
        return this.invoke("isProduction", {});
    }

    isDevEnv() {
        return this.invoke("isDevEnv", {});
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
        return this.invoke("showOpenDialog", OpenDialogOptions);
    }


    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.electron_services,
        });
    }
}
