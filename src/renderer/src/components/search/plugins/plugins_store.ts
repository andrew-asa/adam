import { defineStore } from "pinia";
import _ from "lodash";
import { getPlugins } from "@/renderer/src/utils/app/app_api";
import { ctx } from '@renderer/startup/ctx_starter'
import { getHandler } from "./handler/handlers";
import { default_plugin } from "./market/plugin";
interface PluginsState {
    displayCards: any[];
    plugins: plugin[];
    options: option[];
    searchValue: string;
    placeholder: string;
    currentSelect: number;
    currentPlugin: any;
    clipboardFile: any[];
    pageCount: number;
    _init: boolean;
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
    }),
    actions: {
        selectPlugin(plugin: plugin) {
            // let setCurrentSelect = _.findIndex(this.options, plugin)
            // if (setCurrentSelect > -1) {
            //     this.setCurrentSelect(setCurrentSelect)
            //     this.setCurrentPlugin(plugin);
            //     this._setSearchValue("");
            // }
            getHandler(plugin).open(plugin);
            // if (handler) {
            //     handler.open(plugin);
            // }
        },
        onClickPlugin(plugin: plugin) {
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
        setCurrentPlugin(plugin: plugin) {
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
        setPageCount(pageCount: number) {
            console.log(`setPageCount: ${pageCount}`);
            if (pageCount > 0) {
                this.pageCount = pageCount;
                this._showOptions(this.plugins);
            }
        },
        addOption(option: any) {
            this.options.push(option);
        },
        setOptions(options: any[]) {
            this.options = options
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
            this.plugins = this.getDefaultPlugins();
            _.each(plugins, (app: any) => {
                app.zIndex = 0;
                let p = app as plugin
                this.plugins.push(p);
            })
        },
        getDefaultPlugins() {
            return default_plugin
        },
        initOptions() {
            if (!this._init) {
                getPlugins().then(({ data }) => {
                    this.setPlugins(data);
                    this._init = true;
                    console.log(`initOptions done`);
                })
            }
        },
        search(value: string) {
            this._setSearchValue(value);
            this._doSearch(value);
        },
        _setSearchValue(value: string) {
            this.searchValue = value;
        },
        _doSearch(value: string) {
            if (!value) {
                this._showOptions([]);
                return;
            }
            let options = this.plugins
            const descMap = new Map();
            const s = options.filter((plugin: any) => {
                if (!descMap.get(plugin)) {
                    descMap.set(plugin, true);
                    let has = false;
                    let keywords = plugin.keywords || [];
                    for (let i = 0; i < keywords.length; i++) {
                        let keyword = keywords[i];
                        if (keyword.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) >= 0) {
                            has = true;
                            if (value !== keyword && keyword !== plugin.name) {
                                plugin.selectName = keyword + " | " + plugin.name;
                            }
                            break;
                        }
                    }
                    // plugin.keywords.some((keyWord) => {
                    //     if (
                    //         keyWord
                    //             .toLocaleUpperCase()
                    //             .indexOf(value.toLocaleUpperCase()) >= 0
                    //     ) {
                    //         has = keyWord;
                    //         // plugin.name = keyWord;
                    //         // plugin.selectName = keyWord + " | " + plugin.name;
                    //         if (value !== keyWord && keyWord !== plugin.name) {
                    //             // plugin.name = keyWord;
                    //             plugin.selectName = keyWord + " | " + plugin.name;
                    //         }
                    //         return true;
                    //     }
                    //     return false;
                    // });
                    return has;
                } else {
                    return false;
                }
            })
            this._showOptions(s);
        },
        /**
         * 清空可选项展示
         */
        emptyShow() {
            this._showOptions([]);
        },
        keydown(e: any) {
            // 当前插件插件不存在的情况
            this._checkBackspace(e)
            this._checkPaste(e)
            this._checkSelectKeyPress(e)
            this._checkChooseKeyPress(e)
            this._checkEscape(e)
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
                // this.setCurrentPlugin({}); 
                // this.removeCurrentPlugin();
                if (this.currentPlugin && this.currentPlugin.name) {
                    // this.removeCurrentPlugin();
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
        _showOptions(options, page = 0) {
            this.currentSelect = 0
            this.options = []
            if (!_.isEmpty(options)) {
                this.options = options.slice(page * this.pageCount, (page + 1) * this.pageCount);
            }
        },
        clickPlugin(plugin: any) {
            this.setCurrentPlugin(plugin);
        }
    },
})