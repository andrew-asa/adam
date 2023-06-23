export const total_plugins = [
    {
      "name": "rubick-xunfei-ocr",
      "pluginType": "ui",
      "pluginName": "讯飞ocr",
      "description": "使用讯飞ocr接口图片识别文本",
      "author": "anrgct",
      "version": "0.1.3",
      "main": "./target/index.html",
      "homePage": "https://gitee.com/rubick-center/rubick-xunfei-ocr/raw/master/README.md",
      "logo": "https://picx.zhimg.com/80/v2-4c056cc6ca01ba1472ce200770e73ffa_720w.png",
      "preload": "../src/preload.js",
      "features": [
        {
          "code": "xunfei",
          "explain": "讯飞ocr图片识别文本",
          "cmds": [
            "讯飞ocr",
            "xunfei",
            {
              "type": "img",
              "label": "讯飞ocr"
            },
            {
              "type": "files",
              "label": "讯飞ocr",
              "fileType": "file",
              "match": "/.(png|jpg|jpeg|bmp)$/",
              "minNum": 1,
              "maxNum": 1
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-doutu",
      "pluginName": "斗图",
      "description": "斗图表情搜索",
      "author": "vst",
      "main": "index.html",
      "logo": "https://static.91jkys.com/activity/img/2adb63c2e5d54dc1b26001958fcdb044.jpg",
      "version": "0.0.1",
      "preload": "preload.js",
      "homePage": "https://gitee.com/rubick-center/rubick-doutu/raw/master/README.md",
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
      ]
    },
    {
      "name": "rubick-system-mac-touchbar",
      "pluginName": "mac touchbar 内存管理工具",
      "version": "1.0.0",
      "description": "轻松通过 touchbar 管理内存",
      "entry": "index.js",
      "logo": "https://static.91jkys.com/upload/202112/08/5bac90649c5343cabb63930b131cf8e6.png",
      "pluginType": "system"
    },
    {
      "name": "rubick-system-super-panel",
      "pluginName": "超级面板",
      "version": "1.0.5",
      "description": "超级面板，长按右击可唤起",
      "main": "index.html",
      "entry": "main.js",
      "preload": "preload.js",
      "logo": "https://static.91jkys.com/upload/202112/09/d07325136a5e4ff89913650678c1ec9f.png",
      "pluginType": "system",
      "homePage": "https://gitee.com/rubick-center/rubick-system-super-panel/raw/master/readme.md",
      "features": [
        {
          "code": "setting",
          "explain": "设置超级面板",
          "cmds": [
            "设置超级面板",
            "超级面板"
          ]
        }
      ]
    },
    {
      "name": "rubick-qrcode",
      "main": "index.html",
      "logo": "https://static.91jkys.com/upload/202112/09/7c16a0484bbb44a0b7392180a4221154.png",
      "preload": "preload.js",
      "description": "二维码生成及解码",
      "author": "muwoo",
      "version": "0.0.1",
      "pluginType": "ui",
      "pluginName": "二维码生成及解码",
      "features": [
        {
          "code": "QRCode",
          "explain": "二维码生成及解码",
          "cmds": [
            "QRCode",
            "二维码",
            {
              "type": "regex",
              "match": "/^https?:\\/\\/(?:(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3})|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#][^\\s\"]*)?$/i",
              "label": "生成二维码"
            },
            {
              "type": "img",
              "label": "解码二维码"
            },
            {
              "type": "window",
              "platform": [
                "win32",
                "darwin"
              ],
              "match": {
                "app": [
                  "chrome.exe",
                  "firefox.exe",
                  "MicrosoftEdge.exe",
                  "iexplore.exe",
                  "opera.exe",
                  "brave.exe",
                  "msedge.exe",
                  "Google Chrome.app",
                  "Safari.app",
                  "Opera.app",
                  "Vivaldi.app",
                  "Brave Browser.app",
                  "Microsoft Edge.app"
                ]
              },
              "label": "网页二维码"
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-tpl-bookmarks-search",
      "version": "0.0.1",
      "preload": "preload.js",
      "pluginName": "浏览器书签搜索",
      "description": "chrome、edge 浏览器书签搜索",
      "logo": "https://static.91jkys.com/attachment/kaer-admin/44205884647b4a5f8dfe7ef9daee1f62b417b2d539a8b85cf64602f170be2499.png",
      "platform": [
        "win32",
        "darwin"
      ],
      "pluginType": "ui",
      "features": [
        {
          "code": "bookmarks-search",
          "explain": "Chrome、Edge 书签搜索",
          "cmds": [
            "bookmarks",
            "书签"
          ]
        }
      ]
    },
    {
      "pluginName": "Ctool",
      "description": "Ctool 程序开发常用工具",
      "author": "baiy",
      "homePage": "https://github.com/baiy/Ctool",
      "main": "tool.html",
      "version": "1.9.4",
      "name": "rubick-ctool",
      "pluginType": "ui",
      "logo": "https://static.91jkys.com/attachment/kaer-admin/8fafac108cfc486180dedc136df20b76707add249f639eec70c10a25cd129605.png",
      "pluginSetting": {
        "single": false
      },
      "features": [
        {
          "code": "ctool",
          "explain": "程序开发常用工具",
          "cmds": [
            "ctool",
            "程序开发常用工具"
          ]
        },
        {
          "code": "ctool-hash",
          "explain": "哈希(hash)",
          "cmds": [
            "hash",
            "哈希(hash)",
            "ctool-hash",
            "md5",
            "sha1",
            "sha256",
            "sha512",
            "sm3"
          ]
        },
        {
          "code": "ctool-encrypt",
          "explain": "加密/解密",
          "cmds": [
            "encrypt",
            "加密/解密",
            "ctool-encrypt",
            "AES",
            "DES",
            "RC4",
            "Rabbit",
            "TripleDes",
            "sm2"
          ]
        },
        {
          "code": "ctool-sign",
          "explain": "签名/验签",
          "cmds": [
            "sign",
            "签名/验签",
            "ctool-sign",
            "签名",
            "验签",
            "rsa"
          ]
        },
        {
          "code": "ctool-base64",
          "explain": "BASE64编码",
          "cmds": [
            "base64",
            "BASE64编码",
            "ctool-base64"
          ]
        },
        {
          "code": "ctool-json",
          "explain": "JSON工具",
          "cmds": [
            "json",
            "JSON工具",
            "ctool-json"
          ]
        },
        {
          "code": "ctool-url",
          "explain": "URL编码",
          "cmds": [
            "url",
            "URL编码",
            "ctool-url"
          ]
        },
        {
          "code": "ctool-timestamp",
          "explain": "时间戳",
          "cmds": [
            "timestamp",
            "时间戳",
            "ctool-timestamp",
            {
              "type": "regex",
              "match": "/(^\\d{10}(?:\\d{3})?$)|(^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}(?:\\.\\d{3})?$)/i",
              "minLength": 10,
              "maxLength": 25,
              "label": "时间戳"
            }
          ]
        },
        {
          "code": "ctool-qrCode",
          "explain": "二维码",
          "cmds": [
            "qrCode",
            "二维码",
            "ctool-qrCode"
          ]
        },
        {
          "code": "ctool-qrCode-generate",
          "explain": "二维码 - 生成",
          "cmds": [
            {
              "type": "regex",
              "match": "/[a-zA-z]+://[^\\s]*/i",
              "minLength": 8,
              "label": "二维码 - 生成"
            }
          ]
        },
        {
          "code": "ctool-qrCode-reader",
          "explain": "二维码 - 解析",
          "cmds": [
            {
              "type": "regex",
              "match": "/[a-zA-z]+://[^\\s]*/i",
              "minLength": 8,
              "label": "二维码 - 解析"
            }
          ]
        },
        {
          "code": "ctool-barcode",
          "explain": "条形码",
          "cmds": [
            "barcode",
            "条形码",
            "ctool-barcode"
          ]
        },
        {
          "code": "ctool-pinyin",
          "explain": "汉字转拼音",
          "cmds": [
            "pinyin",
            "汉字转拼音",
            "ctool-pinyin"
          ]
        },
        {
          "code": "ctool-ip",
          "explain": "IP地址查询",
          "cmds": [
            "ip",
            "IP地址查询",
            "ctool-ip",
            {
              "type": "regex",
              "match": "/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/i",
              "minLength": 7,
              "maxLength": 15,
              "label": "IP地址查询"
            }
          ]
        },
        {
          "code": "ctool-code",
          "explain": "代码格式化",
          "cmds": [
            "code",
            "代码格式化",
            "ctool-code"
          ]
        },
        {
          "code": "ctool-unicode",
          "explain": "Unicode",
          "cmds": [
            "unicode",
            "Unicode",
            "ctool-unicode",
            {
              "type": "regex",
              "match": "/\\\\u[0-9a-f]{4}/i",
              "minLength": 6,
              "label": "Unicode"
            }
          ]
        },
        {
          "code": "ctool-decimalConvert",
          "explain": "进制转换",
          "cmds": [
            "decimalConvert",
            "进制转换",
            "ctool-decimalConvert"
          ]
        },
        {
          "code": "ctool-regex",
          "explain": "正则表达式",
          "cmds": [
            "regex",
            "正则表达式",
            "ctool-regex"
          ]
        },
        {
          "code": "ctool-randomString",
          "explain": "随机字符生成",
          "cmds": [
            "randomString",
            "随机字符生成",
            "ctool-randomString"
          ]
        },
        {
          "code": "ctool-serializeConversion",
          "explain": "序列化转换",
          "cmds": [
            "serializeConversion",
            "序列化转换",
            "ctool-serializeConversion"
          ]
        },
        {
          "code": "ctool-diffs",
          "explain": "文本比对",
          "cmds": [
            "diffs",
            "文本比对",
            "ctool-diffs"
          ]
        },
        {
          "code": "ctool-crontab",
          "explain": "crontab",
          "cmds": [
            "crontab",
            "ctool-crontab"
          ]
        },
        {
          "code": "ctool-websocket",
          "explain": "websocket",
          "cmds": [
            "websocket",
            "ctool-websocket"
          ]
        },
        {
          "code": "ctool-unit",
          "explain": "单位换算",
          "cmds": [
            "unit",
            "单位换算",
            "ctool-unit"
          ]
        },
        {
          "code": "ctool-time",
          "explain": "时间计算器",
          "cmds": [
            "time",
            "时间计算器",
            "ctool-time"
          ]
        },
        {
          "code": "ctool-uuid",
          "explain": "UUID生成",
          "cmds": [
            "uuid",
            "UUID生成",
            "ctool-uuid"
          ]
        },
        {
          "code": "ctool-jsonToObject",
          "explain": "JSON转实体类",
          "cmds": [
            "jsonToObject",
            "JSON转实体类",
            "ctool-jsonToObject"
          ]
        },
        {
          "code": "ctool-ascii",
          "explain": "ASCII",
          "cmds": [
            "ascii",
            "ASCII",
            "ctool-ascii"
          ]
        },
        {
          "code": "ctool-variableConversion",
          "explain": "变量名",
          "cmds": [
            "variableConversion",
            "变量名",
            "ctool-variableConversion"
          ]
        },
        {
          "code": "ctool-jwt",
          "explain": "JWT解码",
          "cmds": [
            "jwt",
            "JWT解码",
            "ctool-jwt",
            "jwtDecode"
          ]
        },
        {
          "code": "ctool-hexString",
          "explain": "Hex/String",
          "cmds": [
            "hexString",
            "Hex/String",
            "ctool-hexString",
            "hex to string",
            "string to hex",
            "十六进制转字符串",
            "字符串转十六机制"
          ]
        },
        {
          "code": "ctool-text",
          "explain": "文本处理",
          "cmds": [
            "text",
            "文本处理",
            "ctool-text",
            "大小写转换",
            "中英文标点转换",
            "简繁转换",
            "字符替换",
            "字符统计",
            "行去重",
            "添加行号",
            "行排序",
            "过滤行首尾不可见字符",
            "过滤空行"
          ]
        },
        {
          "code": "ctool-html",
          "explain": "Html编码",
          "cmds": [
            "html",
            "Html编码",
            "ctool-html"
          ]
        },
        {
          "code": "ctool-binary",
          "explain": "原码/反码/补码",
          "cmds": [
            "binary",
            "原码/反码/补码",
            "ctool-binary",
            "原码",
            "补码",
            "反码"
          ]
        },
        {
          "code": "ctool-armConverter",
          "explain": "ARM/HEX",
          "cmds": [
            "armConverter",
            "ARM/HEX",
            "ctool-armConverter",
            "ARM",
            "HEX"
          ]
        }
      ]
    },
    {
      "name": "rubick-tpl-calc",
      "pluginName": "计算器",
      "description": "简单实用的计算器插件",
      "author": "vst",
      "version": "0.0.1",
      "homePage": "https://raw.githubusercontent.com/zhaoeryu/utools-calc/master/README.md",
      "pluginType": "ui",
      "preload": "preload.js",
      "logo": "https://static.91jkys.com/attachment/kaer-admin/fd9db2acfe8a4056990a89da3bb2589e728b5c6c12295df4bd4b34d52a8ad78e.png",
      "features": [
        {
          "code": "calc",
          "explain": "计算器",
          "cmds": [
            "calc",
            "计算器",
            {
              "type": "regex",
              "label": "计算器",
              "match": "/^(?:\\(*-?\\d+(\\.\\d+)?\\)* ?[+\\-*/%] ?)+\\(*-?\\d+(\\.\\d+)?\\)*$/"
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-webpage-open",
      "pluginName": "网页快开",
      "description": "快速打开搜索网站",
      "author": "muwoo",
      "main": "index.html",
      "logo": "https://pic1.zhimg.com/80/v2-fa7fdca30c091f589d0addd779941ead_720w.png",
      "version": "0.0.2",
      "preload": "preload.js",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-webpage-open/raw/master/README.md",
      "pluginType": "ui",
      "features": [
        {
          "code": "setting",
          "explain": "网页快开设置",
          "cmds": [
            "网页快开设置"
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-plugin-saladic",
      "pluginName": "沙拉查词",
      "description": "沙拉查词-聚合词典专业查词翻译",
      "main": "ext-saladic/utools.html",
      "author": "anrgct",
      "version": "0.2.9",
      "logo": "https://pica.zhimg.com/80/v2-a07b9200b07c57e4187fd5ad69699733_1440w.png",
      "preload": "../preload.js",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-plugin-saladic/raw/master/README.md",
      "pluginType": "ui",
      "features": [
        {
          "code": "沙拉查词",
          "explain": "沙拉查词",
          "cmds": [
            "沙拉查词",
            "saladict",
            {
              "type": "over",
              "label": "沙拉查词"
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-plugin-mverything",
      "pluginName": "Mverything",
      "author": "lanyuanxiaoyao",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-plugin-mverything/raw/master/README.md",
      "description": "Mac 上的 Everything",
      "version": "0.1.6",
      "logo": "https://pica.zhimg.com/80/v2-f1a705a90eaac24af98093a1086e1435_720w.png",
      "main": "index.html",
      "preload": "preload.js",
      "platform": [
        "darwin"
      ],
      "pluginType": "ui",
      "features": [
        {
          "code": "find",
          "explain": "查找 Mac 上的文件",
          "cmds": [
            "find",
            "查找",
            {
              "type": "files",
              "label": "在此文件夹中搜索",
              "fileType": "directory",
              "minNum": 1,
              "maxNum": 1
            },
            {
              "type": "window",
              "label": "在此文件夹中搜索",
              "match": {
                "bundleId": "com.apple.finder"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-plugin-wallhaven",
      "pluginName": "最美壁纸",
      "description": "在线查找壁纸、锁屏图片，自动更换壁纸、锁屏图片的插件。",
      "main": "index.html",
      "version": "0.2.0",
      "preload": "preload.js",
      "author": "rockxsj",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-plugin-wallhaven/raw/master/README.md",
      "logo": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4df8587e3333492c8ab5f92d0d0783f8~tplv-k3u1fbpfcp-watermark.image",
      "pluginType": "ui",
      "features": [
        {
          "code": "wallpaper",
          "explain": "壁纸插件",
          "cmds": [
            "wallpaper",
            "wp",
            "壁纸",
            "bg"
          ]
        }
      ]
    },
    {
      "name": "rubick-game-tank",
      "pluginName": "坦克大战",
      "description": "小霸王经典坦克游戏",
      "author": "muwoo",
      "main": "index.html",
      "logo": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e885ea40bce342829884c289b7026822~tplv-k3u1fbpfcp-watermark.image",
      "version": "0.0.1",
      "homePage": "https://gitee.com/rubick-center/rubick-game-tank/raw/master/README.md",
      "pluginType": "ui",
      "features": [
        {
          "code": "tank",
          "explain": "坦克大战",
          "cmds": [
            "tank",
            "坦克大战"
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-plugin-demo-localhost",
      "pluginName": "插件demo",
      "description": "rubick ui 插件demo",
      "author": "muwoo",
      "main": "index.html",
      "logo": "https://static.91jkys.com/attachment/kaer-admin/476bbe78674441bc8c904f6b14e450c8ba71d16f9ffe3e04b75bbd5760c8a738.png",
      "version": "0.0.1",
      "preload": "preload.js",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-plugin-demo/raw/master/README.md",
      "pluginType": "ui",
      "features": [
        {
          "code": "index",
          "explain": "测试插件",
          "cmds": [
            "demo",
            "测试"
          ]
        }
      ]
    },
    {
      "name": "rubick-system-color-picker",
      "pluginName": "取色器",
      "version": "1.0.1",
      "description": "取色器",
      "main": "index.html",
      "preload": "preload.js",
      "logo": "https://pic1.zhimg.com/80/v2-5f1810a71af6eefcd77edbbf07ea1cc7_720w.png",
      "homePage": "https://gitee.com/rubick-center/rubick-system-color-picker/raw/master/README.md",
      "pluginType": "ui",
      "features": [
        {
          "code": "colorpicker",
          "explain": "取色器",
          "cmds": [
            "colorpicker",
            "qs",
            "取色"
          ]
        }
      ]
    },
    {
      "name": "rubick-ui-clipboard",
      "pluginName": "超级剪切板",
      "version": "1.0.4",
      "description": "及时随地保存内容",
      "main": "index.html",
      "entry": "main.js",
      "preload": "preload.js",
      "logo": "https://pic1.zhimg.com/80/v2-8808dd420ee9804ad588aaee01ba9398_720w.png",
      "pluginType": "system",
      "homePage": "https://gitee.com/rubick-center/rubick-ui-clipboard/raw/master/README.md",
      "features": [
        {
          "code": "record",
          "explain": "超级剪切板",
          "cmds": [
            "超级剪切板",
            "clipboard",
            "jqb"
          ]
        }
      ]
    },
    {
      "name": "rubick-hoppscotch-app",
      "pluginName": "Hoppscotch",
      "description": "Http/WebSocket/GraphQL/Api 请求调试工具，帮助你更快地创建请求，节省宝贵的开发时间",
      "author": "baiy",
      "main": "index.html",
      "version": "2.2.0",
      "homePage": "https://gitee.com/rubick-center/rubick-hoppscotch/raw/adapter-utools/README.md",
      "logo": "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/927f6c18cc664e0e841293a6cff918e0~tplv-k3u1fbpfcp-watermark.image",
      "features": [
        {
          "code": "Hoppscotch",
          "explain": "[Http/WebSocket/GraphQL/Api] 调试工具",
          "cmds": [
            "http",
            "get",
            "post",
            "api",
            "websocket",
            "graphql"
          ]
        }
      ],
      "pluginType": "ui"
    },
    {
      "name": "rubick-host",
      "preload": "preload/preload.js",
      "main": "index.html",
      "logo": "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebbbf8a1d6834b1dabfe6de86057dc1d~tplv-k3u1fbpfcp-watermark.image",
      "features": [
        {
          "code": "hosts",
          "explain": "hosts切换",
          "cmds": [
            "hosts"
          ]
        }
      ],
      "pluginName": "hosts切换",
      "description": "管理你的hosts文件",
      "author": "muwoo",
      "homePage": "https://gitee.com/rubick-center/rubick-host/raw/master/README.md",
      "version": "2.0.3",
      "pluginType": "ui"
    },
    {
      "name": "mossgpt-rubick",
      "pluginType": "ui",
      "main": "index.html",
      "preload": "preload.js",
      "logo": "https://picx.zhimg.com/80/v2-90c9f3de1702ec6d216120c7a83e340d_720w.png",
      "pluginName": "MossGPT",
      "description": "强如 Moss 的对话 AI",
      "author": "lblblong",
      "homePage": "https://gitee.com/rubick-center/mossgpt-rubick/raw/master/README.md",
      "version": "0.0.2",
      "platform": [
        "win32",
        "darwin",
        "linux"
      ],
      "features": [
        {
          "code": "moss",
          "explain": "这是 Moss 的回答",
          "cmds": [
            "Moss",
            "MossGPT",
            "ChatGPT",
            "Chat"
          ]
        },
        {
          "code": "text",
          "explain": "问问 Moss",
          "cmds": [
            {
              "type": "over",
              "label": "问问 Moss",
              "minLength": 1,
              "maxLength": 500
            }
          ]
        },
        {
          "code": "translation",
          "explain": "Moss 翻译",
          "cmds": [
            {
              "type": "over",
              "label": "Moss 翻译",
              "minLength": 1,
              "maxLength": 3000
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-plugin-network",
      "pluginName": "网络抓包",
      "pluginType": "ui",
      "description": "网络抓包、mock、多环境联调",
      "main": "index.html",
      "version": "0.0.9",
      "homePage": "https://gitee.com/rubick-center/rubick-plugin-network/raw/master/README.md",
      "logo": "https://picx.zhimg.com/80/v2-e3eaaf69064644d281532e332a2680d8_720w.png",
      "preload": "preload.js",
      "features": [
        {
          "explain": "网络抓包&mock",
          "cmds": [
            "network",
            "mock"
          ]
        }
      ],
      "pluginSetting": {
        "height": 800
      },
      "dependencies": {
        "anyproxy-rubick": "^4.0.12"
      }
    },
    {
      "name": "rubick-ui-picture-bed",
      "version": "1.0.0",
      "pluginType": "ui",
      "pluginName": "图床",
      "description": "图床",
      "author": "xiaou",
      "main": "vue/index.html",
      "update": false,
      "preload": "../preload.js",
      "homePage": "https://gitee.com/rubick-center/rubick-picture-bed/raw/master/README.md",
      "logo": "https://picx.zhimg.com/80/v2-59494aad1c392863b2869b917219cb69_720w.png",
      "features": [
        {
          "code": "bookmark",
          "explain": "图床",
          "cmds": [
            "图床",
            "picture",
            {
              "type": "files",
              "label": "上传到图床",
              "fileType": "file",
              "match": "/.*(jpg|png|jpeg|gif)$/i",
              "minLength": 1,
              "maxLength": 10
            },
            {
              "type": "img",
              "label": "上传到图床"
            }
          ]
        }
      ]
    },
    {
      "name": "rubick-nat",
      "pluginName": "内网穿透NAT",
      "pluginType": "ui",
      "description": "内网穿透",
      "author": "lblblong",
      "homepage": "https://github.com/lblblong/nat-utools",
      "main": "./index.html",
      "preload": "./index.js",
      "version": "2.0.1",
      "logo": "https://pic1.zhimg.com/80/v2-d8ca1277337b824fb98330c477417d9f_1440w.png",
      "homePage": "https://gitee.com/rubick-center/rubick-nat/raw/master/README.md",
      "platform": [
        "win32",
        "darwin",
        "linux"
      ],
      "features": [
        {
          "code": "startLiveServer",
          "explain": "内网穿透管理面板",
          "cmds": [
            "内网穿透"
          ]
        }
      ]
    },
    {
      "name": "rubick-json-editor",
      "version": "1.7.1",
      "pluginName": "JSON 编辑器",
      "pluginType": "ui",
      "main": "index.html",
      "logo": "https://picx.zhimg.com/80/v2-9829832ee97d87a27ba83995fae70759_720w.png",
      "preload": "preload.js",
      "pluginSetting": {
        "single": false
      },
      "features": [
        {
          "code": "json",
          "explain": "Json 格式化编辑",
          "cmds": [
            "Json",
            {
              "type": "regex",
              "minLength": 2,
              "match": "/^\\s*(\\{[\\s\\S]*\\}|\\[[\\s\\S]*\\])\\s*$/",
              "label": "Json"
            },
            {
              "type": "files",
              "fileType": "file",
              "maxLength": 1,
              "match": "/\\.json$/i",
              "label": "Json"
            }
          ]
        },
        {
          "code": "urlparams2json",
          "explain": "URL Params 转 JSON",
          "cmds": [
            {
              "type": "regex",
              "minLength": 6,
              "match": "/^(?:[^\\s=&]{1,40}=[^\\s=&]*&)+[^\\s=&]{1,40}=[^\\s=&]*$/",
              "label": "URL Params 转 JSON"
            }
          ]
        }
      ],
      "description": "JSON 格式化处理",
      "author": "",
      "homePage": "https://gitee.com/rubick-center/rubick-json-editor/raw/master/README.md"
    },
    {
      "name": "rubick-oss-plugin",
      "pluginName": "古茗 oss 上传插件",
      "description": "古茗 oss 上传插件",
      "pluginType": "system",
      "entry": "index.js",
      "author": "muwoo",
      "main": "index.html",
      "preload": "preload.js",
      "version": "0.0.1",
      "logo": "https://pica.zhimg.com/80/v2-1558d0e5220afabafc2c3c902e7729d0_720w.png",
      "homePage": "https://gitee.com/rubick-center/rubick-nat/raw/master/README.md",
      "features": [
        {
          "code": "upload",
          "explain": "oss 文件上传",
          "cmds": [
            "文件上传",
            "oss",
            "picture",
            {
              "type": "file",
              "label": "上传到古茗 oss",
              "fileType": "file",
              "match": "/.*/",
              "minLength": 1,
              "maxLength": 10
            },
            {
              "type": "img",
              "label": "上传到古茗 oss"
            }
          ]
        }
      ]
    },
    {
    "main": "index.html",
    "logo": "https://pic1.zhimg.com/80/v2-959666589c798bf2a259eb7068e9e201_720w.png",
    "pluginType": "ui",
    "preload": "preload.js",
    "features": [
      {
        "code": "rename",
        "explain": "系统文件(夹)批量重命名",
        "cmds": [
          "批量重命名",
          {
            "type": "files",
            "label": "重命名"
          }
        ]
      }
    ],
    "name": "rubick-plugin-rename",
    "pluginName": "文件批量重命名",
    "description": "系统文件(夹)批量重命名",
    "author": "muwoo",
    "homePage": "https://gitee.com/rubick-center/rubick-plugin-rename/raw/master/README.md",
    "version": "1.0.0"
  },
  {
    "main": "index.html",
    "logo": "https://pic1.zhimg.com/80/v2-dc75cd3de8e745d6b702fa5b0404d898_720w.png",
    "pluginType": "ui",
    "features": [
      {
        "code": "calc",
        "explain": "像打草稿一样计算",
        "cmds": [
          "计算稿纸"
        ]
      },
      {
        "code": "expression",
        "explain": "表达式计算",
        "cmds": [
          {
            "type": "regex",
            "match": "/^\\(*[+-]?(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?%?\\)*(?:\\s*[+*/^%-]\\s*\\(*[+-]?(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?%?\\)*)+$/",
            "label": "计算"
          }
        ]
      },
      {
        "code": "sum",
        "explain": "一串数字求和",
        "cmds": [
          {
            "type": "regex",
            "match": "/^\\s*(?:(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?\\s+)+(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?\\s*$/",
            "label": "求和"
          }
        ]
      },
      {
        "code": "average",
        "explain": "一串数字求平均值",
        "cmds": [
          {
            "type": "regex",
            "match": "/^\\s*(?:(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?\\s+)+(?:\\d{1,15}|\\d{1,3}(?:,\\d\\d\\d){1,4})(?:\\.\\d{1,15})?\\s*$/",
            "label": "求平均值"
          }
        ]
      }
    ],
    "name": "rubick-plugin-calc",
    "pluginName": "计算稿纸",
    "description": "像打草稿一样计算",
    "author": "muwoo",
    "homePage": "https://gitee.com/rubick-center/rubick-plugin-calc/raw/master/README.md",
    "version": "1.2.1"
  },
  {
    "name": "ai-copilot-plugin",
    "pluginName": "Ai Copilot 全能AI助手",
    "description": "AI Copilot是一款集成多个大语言模型的AI工具，包括gpt3.5、gpt4.0 和Google Bard等。",
    "homePage": "https://flowus.cn/share/a65f8e7d-a7d2-4b19-98cb-1be820c34bd5",
    "main": "index.html",
    "pluginType": "ui",
    "logo": "https://gpt.ai-copilot.cn/static/img/logo.73de5465.jpg",
    "version": "1.0.5",
    "features": [
      {
        "code": "main",
        "explain": "AiCopilot - 全能AI助手",
        "cmds": ["chat", "gpt", "copilot", "ai", "chatgpt", "bard", "zs"]
      },
      {
        "code": "code",
        "explain": "code copilot",
        "cmds": ["code copilot"]
      },
      {
        "code": "code.explain",
        "explain": "解释代码是如何工作的",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "explain code | 解释代码",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.summary",
        "explain": "为代码生成摘要",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "generate summary | 生成摘要",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.performance",
        "explain": "检查代码性能问题，并重写",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "performance check | 性能检测",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.security",
        "explain": "检查代码安全问题，并重写",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "security check | 安全检测",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.style",
        "explain": "检查代码样式问题，并重写",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "style check | 样式检测",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.readability",
        "explain": "提高代码可读性，并重写",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "improve readability | 可读性",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.format",
        "explain": "格式化代码，并重写",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "format code | 格式化代码",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "code.unitTest",
        "explain": "为代码生成可能的单元测试",
        "cmds": [{
          "type": "regex",
          "match": "/.*/",
          "label": "unit test | 单元测试",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "write.translate",
        "explain": "中英互译",
        "cmds": [ "translate | 翻译", {
          "type": "regex",
          "match": "/.*/",
          "label": "translate | 翻译",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "write.articlePolishing",
        "explain": "文章润色",
        "cmds": [ "article polishing | 文章润色", {
          "type": "regex",
          "match": "/.*/",
          "label": "article polishing | 文章润色",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "write.contentSummary",
        "explain": "内容总结",
        "cmds": [ "content summary | 内容总结", {
          "type": "over",
          "label": "content summary | 内容总结",
          "minLength": 1,
          "maxLength": 10000
        }]
      },
      {
        "code": "write.compose",
        "explain": "文章撰写",
        "cmds": ["compose | 文章撰写"]
      }
    ]
  }
  ]
  