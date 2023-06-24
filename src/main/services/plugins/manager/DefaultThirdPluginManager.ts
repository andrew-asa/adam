import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { DEFAULT_PLUGIN_REGISTRY, PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { spawn } from "child_process";
import fs from 'fs-extra';
export class DefaultThirdPluginManager implements ThirdPluginManager {
    private baseDir: string = "";
    readonly registry: string;
    constructor(options: { baseDir?: string, registry?: string }) {
        console.log(`init DefaultThirdPluginManager`);
        let baseDir = options.baseDir || PLUGINS_INSTALL_DIR
        let register = options.registry || DEFAULT_PLUGIN_REGISTRY;
        this.baseDir = baseDir
        this.registry = register
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
        this.installInternal([plugin.name], { isDev: false });
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }


    async installInternal(adapters: Array<string>, options: { isDev: boolean }) {
        const installCmd = options.isDev ? 'link' : 'install';
        // 安装
        await this.execCommand(installCmd, adapters);
    }

    private cleanCache() {
        spawn('npm', ['cache', 'clean', '-f'], {
            cwd: this.baseDir,
        });
    }
    private async execCommand(cmd: string, modules: string[]): Promise<string> {
        this.cleanCache();
        return new Promise((resolve: any, reject: any) => {
            let args: string[] = [cmd]
                .concat(
                    cmd !== 'uninstall' ? modules.map((m) => `${m}@latest`) : modules
                )
                .concat('--color=always')
                .concat('--save');
            if (cmd !== 'uninstall')
                args = args.concat(`--registry=${this.registry}`);
            const npm = spawn('npm', args, {
                cwd: this.baseDir,
            });

            let output = '';
            npm.stdout
                .on('data', (data: string) => {
                    output += data; // 获取输出日志
                })
                .pipe(process.stdout);

            npm.stderr
                .on('data', (data: string) => {
                    output += data; // 获取报错日志
                })
                .pipe(process.stderr);

            npm.on('close', (code: number) => {
                if (!code) {
                    resolve({ code: 0, data: output }); // 如果没有报错就输出正常日志
                } else {
                    reject({ code: code, data: output }); // 如果报错就输出报错日志
                }
            });
        });
    }
}