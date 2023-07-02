import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { BrowserView, Session } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";

export class DefaultPluginRunner implements ThirdPluginRunner {
    getPreloads(plugin: ThirdPlugin): string[] {
        return [path.join(__dirname, '../preload/index.js')]
    }

    needHandle(plugin: ThirdPlugin): boolean {
        return true
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session,
        view: BrowserView
    }): void {
        const main = this.getPluginMain(plugin)
        if (main) {
            let view = ext.view
            let session = ext.session
            const preloads = this.getRunnerPreloads(plugin)
            session.setPreloads(preloads)
            view.webContents.loadFile(main)
            view.webContents.once('dom-ready', () => {
                const ext: any = plugin.ext || {};
                view.webContents.openDevTools();
            });
        }
    }

    getPluginMain(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin, plugin.main)
    }


    getRunnerPreloads(plugin: ThirdPlugin): string[] {
        return [path.join(__dirname, '../preload/adam.js')]
    }
}