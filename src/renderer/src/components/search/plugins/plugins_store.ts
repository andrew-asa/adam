import { defineStore } from "pinia";
import _ from "lodash";
import { ctx } from '@renderer/startup/ctx_starter'
import { getHandler } from "./handler/handlers";
import { ThirdPlugin } from "@/common/core/plugins";
import { copyThirdPlugin } from "@/common/plugin/plugin_meta_utils";
interface PluginsState {
    displayCards: any[];
    plugins: ThirdPlugin[];
    options: any[];
    searchValue: string;
    placeholder: string;
    currentSelect: number;
    currentPlugin: ThirdPlugin | null | {};
    clipboardFile: any[];
    pageCount: number;
    _init: boolean;
    /**
     * 运行内部插件名字
     */
    internalPluginName: string;
}
export const userStore = defineStore({
    id: "plugins_store",
    state: (): PluginsState => ({
        /**
         * 展示小卡片
         */
        displayCards: [],
        /**
         * 插件
         */
        plugins: [],
        /**
         * 可选参见
         */
        options: [],
        /**
         * 搜索关键字
         */
        searchValue: "",
        /**
         * 搜索框提示文件
         */
        placeholder: "Hi Adam",
        /**
         * 当前选中标签
         */
        currentSelect: 0,
        /**
         * 当前选中插件
         */
        currentPlugin: {},
        /**
         * 粘贴板中文件
         */
        clipboardFile: [],
        pageCount: 35,
        _init: false,
        internalPluginName: ''
    }),
    actions: {
        selectPlugin(plugin: ThirdPlugin) {
            getHandler(plugin).open(plugin);
        },
        onClickPlugin(plugin: ThirdPlugin) {
            console.log(`onClickPlugin: ${plugin.name}`);
            this.selectPlugin(plugin);
        },
        /**
         * 改变当前选中
         * @param index 向上选还是向下选[1,-1]
         */
        changCurrentSelect(index: number) {
            var len = this.options.length;
            if (len > 0) {
                var i = (this.currentSelect + index) % len
                this.currentSelect = i >= 0 ? i : len - 1;
            }
        },
        setCurrentSelect(index: number) {
            this.currentSelect = index;
        },
        setCurrentPlugin(plugin: ThirdPlugin) {
            this.currentPlugin = plugin;
        },
        removeCurrentPlugin() {
            this.currentPlugin = {};
            this.resetPlaceholder();
        },
        setPlaceholder(placeholder: string) {
            this.placeholder = placeholder;
        },
        resetPlaceholder() {
            this.placeholder = "Hi Adam";
        },

        addOption(option: any) {
            this.options.push(option);
        },
        setOptions(options: any[], autoCalPaneHeight: boolean = true) {
            this._showOptions(options, autoCalPaneHeight);
            // this.options = options
        },
        /**
         * 更新应用列表
         * @param apps[{
         *     name: string,
         *     desc: string,
         *     icon: string,
         *     path: string,
         *     keywords:[string],
         *     type: string
         *     version: string
         * }]
         */
        setPlugins(plugins) {
            // this.plugins = this.getDefaultPlugins();
            this.plugins = [];
            _.each(plugins, (app: any) => {
                app.zIndex = 0;
                let p = app as ThirdPlugin
                this.plugins.push(p);
            })
        },

        initOptions() {
            if (!this._init) {
                ctx.services.plugin.getPlugins().then((data) => {
                    this.setPlugins(data);
                    this._init = true;
                    console.log(`initOptions done`);
                })
            }
        },
        search(value: string) {
            this._setSearchValue(value);
            if (this._hasSelectPlugin()) {
                ctx.app.controller.sendSubInputChangeEvent(value)
                return
            }
            this._doSearch(value);
        },
        /**
         * 当前是否有选中的插件
         */
        _hasSelectPlugin(): boolean {
            return this.currentPlugin && this.currentPlugin.name
        },
        _setSearchValue(value: string) {
            this.searchValue = value;
        },
        _doSearch(value: string) {
            if (!value) {
                this._showOptions([]);
                return;
            }
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
                                    pluginName: cmd.label || plugin.pluginName,
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
            this._showOptions(options);
        },
        searchKeyValues(lists, value, strict = false) {
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
        },
        formatReg(regStr) {
            const flags = regStr.replace(/.*\/([gimy]*)$/, '$1');
            const pattern = flags.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
            return new RegExp(pattern, flags);
        },
        /**
         * 清空可选项展示
         */
        emptyShow() {
            this._showOptions([]);
        },
        keydown(e: any) {
            if (this._hasSelectPlugin()) {
                this._trrigerPluginKeydown(e)
            }
            // 当前插件插件不存在的情况
            this._checkBackspace(e)
            this._checkPaste(e)
            this._checkSelectKeyPress(e)
            this._checkChooseKeyPress(e)
            this._checkEscape(e)

        },
        _trrigerPluginKeydown(e: any) {
            const { ctrlKey, shiftKey, altKey, metaKey } = e;
            const modifiers: Array<string> = [];
            ctrlKey && modifiers.push('control');
            shiftKey && modifiers.push('shift');
            altKey && modifiers.push('alt');
            metaKey && modifiers.push('meta');
            const keyCode = e.code
            ctx.app.controller.sendPluginSomeKeyDownEvent({ modifiers, keyCode })
        },
        /**
         * 判断是否为esc 直接隐藏
         */
        _checkEscape(e: any) {
            if (e.key === 'Escape') {
                ctx.app.controller.hide()
            }
        },
        /**
         * 判断是否为退格键
         */
        _checkBackspace(e: any) {
            if (e.target.value === '' && e.keyCode === 8) {
                if (this.currentPlugin && this.currentPlugin.name) {
                    getHandler(this.currentPlugin).close(this.currentPlugin);
                }
            }
        },

        /**
         * 判断是否为ctrl + v
         */
        _checkPaste(e: any) {
            const { ctrlKey, metaKey } = e;
            if ((ctrlKey || metaKey) && e.key === 'v') {
                // console.log(`文件粘贴`);
            }
        },
        /**
         * 上，下，tab键挑选应用
         */
        _checkSelectKeyPress(e: any) {

            if (e.key === 'ArrowUp' || e.key === 'Up') {
                this.changCurrentSelect(-1);
                e.preventDefault();
            }
            if (e.key === 'ArrowDown' || e.key === 'Down') {
                this.changCurrentSelect(1);
            }
            if (e.key === 'Tab') {
                this.changCurrentSelect(1);
                e.preventDefault();
            }
        },
        /**
         * 选中插件
         * @param e 
         */
        _checkChooseKeyPress(e: any) {
            if (e.key === 'Enter') {
                var cp = this.options[this.currentSelect]
                if (cp) {
                    this.selectPlugin(cp);
                }
            }
        },
        _showOptions(options, autoCalPaneHeight: boolean = true, page: number = 0) {
            this.currentSelect = 0
            if (autoCalPaneHeight) {
                if (options.length === 0 && this.options.length > 0) {
                    ctx.app.controller.setExpendHeight(60)
                } else if (options.length > 0 && this.options.length === 0) {
                    // const h = this.options.length * 60 > 600 ? 600 : this.options.length * 60
                    ctx.app.controller.setExpendHeight(600)
                }
            }
            this.options = []
            if (!_.isEmpty(options)) {
                this.options = options.slice(page * this.pageCount, (page + 1) * this.pageCount);
            }
        },
        clickPlugin(plugin: any) {
            this.setCurrentPlugin(plugin);
        },
        setInternalPluginName(name: string) {
            this.internalPluginName = name
        }
    },
})