import { PluginServices } from "@/common/base/services/plugin/PluginServices";
import { ThirdPlugin } from "@/common/core/plugins";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";

export class RendererPluginServices extends PluginServices {
    plugins: ThirdPlugin[];
    constructor() {
        super()
        this.init()
    }

    init() {
        this.getPlugins().then(plugins => {
            this.setPlugins(plugins)
        })
    }

    initListener() {

    }

    setPlugins(plugins: ThirdPlugin[]) {
        this.plugins = plugins
    }

    getAllPlugins(): ThirdPlugin[] {
        return this.plugins
    }

    search(value: string): any {
        let options = []
        this.plugins.forEach((plugin: ThirdPlugin) => {
            //系统应用搜索的是关键字
            if ('app' == plugin.pluginType) {
                let keywords = plugin.keywords || [];
                for (let i = 0; i < keywords.length; i++) {
                    let keyword = keywords[i];
                    if (keyword.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) >= 0) {
                        let item: any = copyThirdPlugin(plugin, false);
                        if (value !== keyword && keyword !== plugin.pluginName) {
                            item.selectName = keyword + " | " + plugin.pluginName;
                        }
                        options.push(item);
                        break;
                    }
                }
            } else {
                // 插件搜索的是fetatures中的cmds看是否有匹配
                let features = plugin.features || [];
                for (let i = 0; i < features.length; i++) {
                    let feature = features[i];
                    const cmds = feature.cmds || [];
                    for (let j = 0; j < cmds.length; j++) {
                        let cmd = cmds[j];
                        if ((typeof cmd === 'string' && cmd.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                            || (cmd.type === 'regex' && this.formatReg(cmd.match).test(value))
                        ) {

                            let item: any = {
                                name: plugin.name,
                                pluginName: cmd.label || feature.label || plugin.pluginName,
                                main: plugin.main,
                                description: feature.explain || plugin.description,
                                logo: plugin.logo,
                                pluginType: plugin.pluginType,
                                preload: plugin.preload,
                                zIndex: cmd.label ? 0 : 1, // 排序权重
                                ext: {
                                    ...plugin.ext,
                                    code: feature.code,
                                    playload: value,
                                    type: cmd.type || 'text'
                                }
                            }
                            if (typeof cmd === 'string' && value !== item && item !== plugin.pluginName) {
                                item.selectName = cmd + " | " + plugin.pluginName;
                            }
                            options.push(item);
                            break;
                        }
                    }
                }
            }
        })

        return options
    }

    private formatReg(regStr) {
        const flags = regStr.replace(/.*\/([gimy]*)$/, '$1');
        const pattern = flags.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        return new RegExp(pattern, flags);
    }

    private searchKeyValues(lists, value, strict = false) {
        return lists.filter((item) => {
            if (typeof item === 'string') {
                return item.toLowerCase().indexOf(value.toLowerCase()) >= 0;
            }
            if (item.type === 'regex' && !strict) {
                return this.formatReg(item.match).test(value);
            }
            if (item.type === 'over') {
                return true;
            }
            return false;
        });
    }
}