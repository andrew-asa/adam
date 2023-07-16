import { AdamPlugin, ThirdPlugin } from "@/common/core/plugins";

export const default_plugin: ThirdPlugin[] = [{
  name: "adam_built_in_plugin_manager",
  pluginName: "插件管理",
  description: "插件管理",
  logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAAAXNSR0IArs4c6QAAAZFJREFUeF7tmkHWgjAMhONp2HEcTgMrOA3HYcdp+EVF8f0iNTUxPj/2bfImM9Om4TBN0yQ//h0AQQQQBBBORgATXgFhHEcT+yyKYnNfr5hJTKiqygSAZdO+7//t7xlzF4S5Gk3TmILQtq2sGeEdExBSPMG7KjPlvGOqmFCWZZY8hmG4W58iB8uYahDqulYB0XWdaEGwigkIWk+YqWlVlS1PsIwJE2DC+bYKEwABJlyv6sgBOSAH5LDuV/AEPCHTE1Qt5GWRtou0iqmSQ04yj9amvCdYxgQErSdYViXk89qclOfz9wKwZ8xdOSxJeQ1C1izzipkMwrslEGk/QEgxxkgVs8olmQle+gzrCZ5OHfJ08B6JhbwnAMIHhqNfwwTL4eizCVTO6fCsc909HR7JwXIkxhjuUmpv4GFCyo3RuyrIATnc/mf0Zh+egCdkPrnzuw7/LIlwYxRAOJ3kMAEQzlc6Wumcpn5jLQNZEQGEbwCBgexKwz8/fDHwwlBb7rbSobI1SgYQUt4TjMAPtS1MOJbjDx6tq3r5r2m/AAAAAElFTkSuQmCC",
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
  ext: {
    settings: {
      closeCachePage: false
    }
  }
}, {
  name: "adam_test_plugin_manager",
  pluginName: "谷歌",
  description: "谷歌",
  logo: "https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  main: "https://www.google.com.hk/",
  features: [
    {
      cmds: [
        "g",
        "gg",
        "google",
        "谷歌",
      ]
    }
  ],
  pluginType: "web",
  version: "1.0.0",
}, {
  "name": "微信",
  "pluginName": "微信",
  "description": "微信",
  "main": "/Applications/WeChat.app",
  "version": "3.6.2",
  "logo": "files:///cache/ProcessIcon/微信.png",
  "pluginType": "app",
  "keywords": [
    "WeChat",
    "WeiXin",
    "W",
    "微信"
  ]
}
]

export const demo_plugin: ThirdPlugin[] = [{
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
  ext: {
    settings: {
      closeCachePage: true
    }
  }
}, {
  name: "adam_test_plugin_manager",
  pluginName: "谷歌",
  description: "谷歌",
  logo: "https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  main: "https://www.google.com.hk/",
  features: [
    {
      cmds: [
        "g",
        "gg",
        "google",
        "谷歌",
      ]
    }
  ],
  pluginType: "web",
  version: "1.0.0",
}, {
  "name": "adam-plugin-doutu",
  "pluginName": "斗图",
  "description": "斗图表情搜索",
  "author": "vst",
  "main": "dist/index.html",
  "logo": "https://static.91jkys.com/activity/img/2adb63c2e5d54dc1b26001958fcdb044.jpg",
  "version": "0.2.61",
  "preload": "preload/index.js",
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
  "ext": {
    "isdownload": true
  }
}, {
  "name": "微信",
  "pluginName": "微信",
  "description": "微信",
  "main": "/Applications/WeChat.app",
  "version": "3.6.2",
  "logo": "files:///cache/ProcessIcon/微信.png",
  "pluginType": "app",
  "keywords": [
    "WeChat",
    "WeiXin",
    "W",
    "微信"
  ]
},
{
  "name": "adam-plugin-finder",
  "pluginName": "文件管理",
  "description": "文件管理区",
  "author": "andrew.asa",
  "main": "dist/index.html",
  "logo": "files:///plugins/node_modules/adam-plugin-finder/assets/finder.png",
  "version": "0.0.1",
  "preload": "preload/index.js",
  "pluginType": "ui",
  "features": [
    {
      "code": "finder",
      "explain": "文件管理",
      "cmds": ["文件管理", "文件搜索", "wjgl", "wjss"]
    }
  ]
}
]