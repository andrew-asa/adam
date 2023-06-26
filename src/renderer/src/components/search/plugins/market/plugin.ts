import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";

export const default_plugin: ThirdPlugin[] = [{
  name: "adam_built_in_plugin_manager",
  pluginName: "插件管理",
  description: "插件管理",
  logo: "/src/assets/jarvis.png",
  main: "#/search/plugins/market",
  features: [
    {
      cmds: [
        "CJGL",
        "ChaJianGuanLi",
        "插件管理"
      ]
    }
  ],
  pluginType: "web",
  version: "1.0.0",
}, {
  "name": "rubick-doutu",
  "pluginName": "斗图",
  "description": "斗图表情搜索",
  "author": "vst",
  "main": "index.html",
  "logo": "https://static.91jkys.com/activity/img/2adb63c2e5d54dc1b26001958fcdb044.jpg",
  "version": "0.2.61",
  "preload": "preload.js",
  "pluginType": "ui",
  "features": [
    {
      "code": "dt",
      "explain": "斗图",
      "cmds": [
        "doutu",
        "斗图",
        {
          "type": "over",
          "label": "斗图"
        }
      ]
    }
  ],
  ext: {
    adapterEngine: "rubick",
    isdownload: true
  }
}]
