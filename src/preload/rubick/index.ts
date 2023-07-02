import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ctx, start_plugin_enginer_bridge } from '../common/plugin_enginer_bridge';
const { ipcRenderer, shell } = require('electron');

const ipcSendSync = (type: string, data?: any) => {
    const returnValue = ipcRenderer.sendSync('rubick-msg-trigger', {
        type,
        data,
    });
    if (returnValue instanceof Error) throw returnValue;
    return returnValue;
};

const ipcSend = (type, data) => {
    ipcRenderer.send('rubick-msg-trigger', {
        type,
        data,
    });
};
// Custom APIs for renderer
const api = {
    hooks: {},
    // 事件
    onPluginEnter(cb) {
        // console.log(window.rubick.hooks);
        if (typeof cb === 'function') {
            // ctx.plugin.hooks.onPluginEnter = cb;
            // @ts-ignore
            window.rubick.hooks.onPluginEnter = cb;
        }
    },
    onPluginReady(cb) {
        // typeof cb === 'function' && (ctx.plugin.hooks.onPluginReady = cb);
        if (typeof cb === 'function') {
            // ctx.plugin.hooks.onPluginReady = cb;
            // @ts-ignore
            window.rubick.hooks.onPluginReady = cb;
        }
    },
    onPluginOut(cb) {
        // typeof cb === 'function' && (ctx.plugin.hooks.onPluginOut = cb);
        if (typeof cb === 'function') {
            // ctx.plugin.hooks.onPluginOut = cb;
            // @ts-ignore
            window.rubick.hooks.onPluginOut = cb;
        }
    },
    hideMainWindow() {
        ipcSendSync('hideMainWindow');
    },
    showMainWindow() {
        ipcSendSync('showMainWindow');
    },
    showOpenDialog(options) {
        return ipcSendSync('showOpenDialog', options);
    },
    setExpendHeight(height) {
        ipcSendSync('setExpendHeight', height);
    },
    setSubInput(onChange, placeholder = '', isFocus) {
        if (typeof onChange === 'function') {
            // @ts-ignore
            window.rubick.hooks.onSubInputChange = onChange;
            // @ts-ignore
            ctx.plugin.hooks.onSubInputChange = onChange;
        }
        ipcSendSync('setSubInput', {
            placeholder,
            isFocus,
        });
    },
    removeSubInput() {
        // @ts-ignore
        delete window.rubick.hooks.onSubInputChange;
        // @ts-ignore
        delete ctx.plugin.hooks.onSubInputChange;
        ipcSendSync('removeSubInput');
    },
    setSubInputValue(text) {
        ipcSendSync('setSubInputValue', { text });
    },
    subInputBlur() {
        ipcSendSync('subInputBlur');
    },
    getPath(name) {
        return ipcSendSync('getPath', { name });
    },
    showNotification(body, clickFeatureCode) {
        ipcSend('showNotification', { body, clickFeatureCode });
    },
    copyImage(img) {
        return ipcSendSync('copyImage', { img });
    },
    copyText(text) {
        return ipcSendSync('copyText', { text });
    },
    copyFile: (file) => {
        return ipcSendSync('copyFile', { file });
    },
    db: {
        put: (data) => { },
        get: (id) => { },
        remove: (doc) => { },
        bulkDocs: (docs) => { },
        allDocs: (key) => { },
    },
    dbStorage: {
        setItem: (key, value) => {
            const target = { _id: String(key) };
            const result = ipcSendSync('dbGet', { id: target._id });
            // @ts-ignore
            result && (target._rev = result._rev);
            // @ts-ignore
            target.value = value;
            const res = ipcSendSync('dbPut', { data: target });
            if (res.error) throw new Error(res.message);
        },
        getItem: (key) => {
            const res = ipcSendSync('dbGet', { id: key });
            return res && 'value' in res ? res.value : null;
        },
        removeItem: (key) => {
            const res = ipcSendSync('dbGet', { id: key });
            res && ipcSendSync('dbRemove', { doc: res });
        },
    },
    isDarkColors() {
        return false;
    },
    getFeatures() {
        return ipcSendSync('getFeatures');
    },
    setFeature(feature) {
        return ipcSendSync('setFeature', { feature });
    },
    screenCapture(cb) {

    },
    removeFeature(code) {
    },

    // 系统
    shellOpenExternal(url) {
    },

    isMacOs() {
        return true;
    },

    isWindows() {
        return false;
    },

    isLinux() {
        return false;
    },

    shellOpenPath(path) {
    },

    getLocalId: () => { },

    removePlugin() {
    },

    shellShowItemInFolder: (path) => {
    },

    redirect: (label, payload) => {
        // todo
    },

    shellBeep: () => {
    },

    getFileIcon: (path) => {
        return ipcSendSync('getFileIcon', { path });
    },
};


// @ts-ignore (define in dts)
window.rubick = api
start_plugin_enginer_bridge()