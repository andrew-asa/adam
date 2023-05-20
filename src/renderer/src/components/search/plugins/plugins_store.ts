import { DefineStoreOptions, defineStore } from "pinia";
import _ from "lodash";
import { api_urls } from "@/common/common_const";
import { getAppIconPath, getApps } from "@/renderer/src/utils/app/app_api";

export const userStore = defineStore({
    id: "plugins_store",
    state: () => ({
        /**
         * 系统应用
         */
        apps: [],
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
        placeholder: "",
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
        clipbordFile: [],
        pageCount: 5,
        _init: false,
    }),
    actions: {
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
        setCurrentPlugin(plugin: any) {
            this.currentPlugin = plugin;
        },
        setPlaceholder(placeholder: string) {
            this.placeholder = placeholder;
        },
        setPageCount(pageCount: number) {
            console.log(`setPageCount: ${pageCount}`);
            if (pageCount > 0) {
                this.pageCount = pageCount;
                this._showOptions(this.apps);
            }
        },
        addOption(option: any) {
            this.options.push(option);
        },
        /**
         * 更新应用列表
         * @param apps[{
         *     name: string,
         *     icon: string,
         *     path: string,
         *     keywords:[string],
         *     pluginType: string
         *     version: string
         * }]
         */
        setApps(apps) {
            this.apps = [];
            _.each(apps, (app: any) => {
                app.icon_path = getAppIconPath(app.icon);
                app.zIndex = 0;
                this.apps.push(app);
            })
        },
        initOptions() {
            if (!this._init) {
                getApps().then(({ data }) => {
                    this.setApps(data);
                    // this._showOptions(this.apps);
                    this._init = true;
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
            console.log(`search: ${value}`);
            const s = this.apps.filter((app: any) => {
                return app.name.includes(value);
            })
            this._showOptions(s);
        },
        reshowOptions() {
            this._showOptions(this.apps);
        },
        keydown(e: any) {
            // console.log(`keydown: ${e.key} keyCode: ${e.keyCode}`);
            this._checkBackspace(e)
            this._checkPaste(e)
            this._checkSelectKeyPress(e)
            this._checkChooseKeyPress(e)
        },
        /**
         * 判断是否为空格
         */
        _checkBackspace(e: any) {
            if (e.target.value === '' && e.keyCode === 8) {
                this.setCurrentPlugin({});
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
                    this.setCurrentPlugin(cp);
                    this._setSearchValue("");
                }
            }
        },
        _showOptions(options, page = 0) {
            this.options = []
            if (!_.isEmpty(options)) {
                this.options = options.slice(page * this.pageCount, (page + 1) * this.pageCount);
            }
        },
    },
})