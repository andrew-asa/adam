import { ThirdPlugin, ThirdPluginAdapter, ThirdPluginRunner } from "@/common/core/plugins";
import { PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { BrowserView, Session } from "electron";
import path from "path";
import { getPluginFilePath } from "../utils/plugin_utils";

export class RubickPluginRunner implements ThirdPluginRunner {
    private plugins_dir = path.join(PLUGINS_INSTALL_DIR, "./node_modules/");
    needHandle(plugin: ThirdPlugin): boolean {
        return (plugin && plugin.ext && plugin.ext.adapterEngine && plugin.ext.adapterEngine === "rubick") as boolean;
    }

    loadMain(plugin: ThirdPlugin, ext: {
        session: Session,
        view: BrowserView
    }): void {
        const preloads = [path.join(__dirname, '../preload/rubick.js')]
        ext.session.setPreloads(preloads)
        const main = this.getPluginMain(plugin)
        if (main) {
            ext.view.webContents.loadFile(main)
        }
        // console.log(`RubickPluginRunner loadMain: ${plugin.name}:${main}`);
    }

    getPluginMain(plugin: ThirdPlugin): string {
        return getPluginFilePath(plugin, plugin.main)
    }
}