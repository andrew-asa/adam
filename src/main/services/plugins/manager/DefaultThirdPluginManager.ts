import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import fs from 'fs-extra';
export class DefaultThirdPluginManager implements ThirdPluginManager {
    private baseDir: string = "";
    constructor(options: any) {
        console.log(`init DefaultThirdPluginManager`);
        this.baseDir = PLUGINS_INSTALL_DIR
        if (!fs.existsSync(this.baseDir)) {
            fs.mkdirsSync(this.baseDir);
            fs.writeFileSync(
                `${this.baseDir}/package.json`,
                '{"dependencies":{}}'
            );
        }
    }
    install(plugin: ThirdPlugin): void {
        console.log(`install ${plugin.name}`);
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }
}