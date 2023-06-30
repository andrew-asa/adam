import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ctx, start_plugin_enginer_bridge } from '../common/plugin_enginer_bridge';

// Custom APIs for renderer
const api = {
    hooks: {},
    // 事件
    onPluginEnter(cb) {
        // console.log(window.rubick.hooks);
        typeof cb === 'function' && (ctx.plugin.hooks.onPluginEnter = cb);
    },
    onPluginReady(cb) {
        typeof cb === 'function' && (ctx.plugin.hooks.onPluginReady = cb);
    },
    onPluginOut(cb) {
        typeof cb === 'function' && (ctx.plugin.hooks.onPluginOut = cb);
    },
};


// @ts-ignore (define in dts)
window.rubick = api
start_plugin_enginer_bridge()