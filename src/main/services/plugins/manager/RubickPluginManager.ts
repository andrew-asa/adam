import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { DEFAULT_PLUGIN_REGISTRY, PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { spawn } from "child_process";
import fs from 'fs-extra';
import axios from "axios";
/**
 * rubick插件管理器
 */
export class RubickPluginManager implements ThirdPluginManager {
    private baseDir: string = "";
    readonly registry: string;
    pluginCaches = {};
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
    listAllPlugin(): ThirdPlugin[] {
        throw new Error("Method not implemented.");
    }

    install(plugin: ThirdPlugin): void {
        console.log(`install ${plugin.name}`);
        this.installInternal([plugin.name], { isDev: false });
    }
    uninstall(plugin: ThirdPlugin): void {
        console.log(`uninstall ${plugin.name}`);
    }

    /**
   * 列出所有已安装插件
   * @memberof AdapterHandler
   */
    async list() {
        const installInfo = JSON.parse(
            await fs.readFile(`${this.baseDir}/package.json`, 'utf-8')
        );
        const adapters: string[] = [];
        for (const adapter in installInfo.dependencies) {
            adapters.push(adapter);
        }
        return adapters;
    }

    /**
     * 更新
     * @param {string} name
     */
    async upgrade(name: string): Promise<void> {
        // 创建一个npm-registry-client实例
        const packageJSON = JSON.parse(
            fs.readFileSync(`${this.baseDir}/package.json`, 'utf-8')
        );
        const registryUrl = `https://registry.npm.taobao.org/${name}`;

        // 从npm源中获取依赖包的最新版本
        try {
            const installedVersion = packageJSON.dependencies[name].replace('^', '');
            let latestVersion = this.pluginCaches[name];
            if (!latestVersion) {
                const { data } = await axios.get(registryUrl, { timeout: 2000 });
                latestVersion = data['dist-tags'].latest;
                this.pluginCaches[name] = latestVersion;
            }
            if (latestVersion > installedVersion) {
                await this.installInternal([name], { isDev: false });
            }
        } catch (e) {
            // ...
        }
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