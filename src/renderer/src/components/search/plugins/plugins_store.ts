import { defineStore } from "pinia";
import _ from "lodash";
import { ctx } from '@renderer/startup/ctx_starter'
import { ThirdPlugin } from "@/common/core/plugins";
interface PluginsState {
    displayCards: any[];
    options: any[];
    searchValue: string;
    placeholder: string;
    currentSelect: number;
    currentPlugin: ThirdPlugin | null | {};
    clipboardFile: ClipboardItem[];
    pageCount: number;
    /**
     * 内部运行插件
     */
    internalPlugin: {
        // 名字
        name?: string,
        // 代码
        code?: string
        [key: string]: any
    }
}
export interface ClipboardItem {
    name: String,
    dataUrl?: String,
    isFile?: Boolean
    [key: string]: any
}
export const userStore = defineStore({
    id: "plugins_store",
    state: (): PluginsState => ({
        /**
         * 展示小卡片
         */
        displayCards: [],
        
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
        internalPlugin: {}
    }),
    actions: {
        setClipboardFile(clipboardFile: ClipboardItem[]) {
            this.clipboardFile = clipboardFile
        },
        getSearchValue() {
            return this.searchValue
        },
        getCurrentPlugin() {
            return this.currentPlugin;
        },
        refreshCurrentPlugin() {
            this.selectPlugin(this.currentPlugin);
        },
        selectPlugin(plugin: ThirdPlugin) {
            const option = {
                playload: this.searchValue,
                code: (plugin.ext && plugin.ext.code) ? plugin.ext.code : '',
            }
            ctx.app.search.open(plugin, option);
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

        search(value: string) {
            this._setSearchValue(value);
            if (this._hasSelectPlugin()) {
                ctx.services.plugin.triggerPluginInputChange({
                    name: this.currentPlugin.name,
                    value: value
                })
                return
            }
            if (!value) {
                this._showOptions([]);
                return;
            }
            const options = ctx.services.plugin.search(value);
            this._showOptions(options);
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
        
        /**
         * 清空可选项展示
         */
        emptyShow() {
            this._showOptions([]);
        },
        keydown(e: any) {
            if (this._hasSelectPlugin()) {
                this._triggerPluginKeydown(e)
            }
            // 当前插件插件不存在的情况
            this._checkBackspace(e)
            this._checkPaste(e)
            this._checkSelectKeyPress(e)
            this._checkChooseKeyPress(e)
            this._checkEscape(e)
        },
        _triggerPluginKeydown(e: any) {
            const { ctrlKey, shiftKey, altKey, metaKey } = e;
            const modifiers: Array<string> = [];
            ctrlKey && modifiers.push('control');
            shiftKey && modifiers.push('shift');
            altKey && modifiers.push('alt');
            metaKey && modifiers.push('meta');
            const keyCode = e.code
            // ctx.app.controller.sendPluginSomeKeyDownEvent({ modifiers, keyCode })
            ctx.services.plugin.triggerPluginKeyDown({
                keyCode: keyCode,
                modifiers: modifiers,
                name: this.currentPlugin.name
            })
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
                    ctx.app.search.close(this.currentPlugin);
                }
            }
        },

        /**
         * 判断是否为ctrl + v
         */
        _checkPaste(e: any) {
            const { ctrlKey, metaKey } = e;
            if ((ctrlKey || metaKey) && e.key === 'v') {
                console.log(`文件粘贴`);
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

        setInternalPlugin(p: { name?: string, code?: string }) {
            this.internalPlugin = p
        }
    },
    getters: {
    }
})