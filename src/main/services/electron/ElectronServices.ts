import { app, clipboard } from "electron";
import { ServicesProvider } from "@/common/core/types";
export class ElectronServices implements ServicesProvider {
    writeText(text: string) {
        clipboard.writeText(text);
    }

    readText(type?: 'selection' | 'clipboard'): string {
        return clipboard.readText(type);
    }

    getPath(name: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'): string {
        return app.getPath(name)
    }
}