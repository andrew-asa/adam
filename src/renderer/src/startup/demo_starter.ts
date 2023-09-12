import { App } from "vue";
import { Starter } from "./starter";
import _ from "lodash";
import router from "../router";
import { CommonUtils } from "../utils/CommonUtils";

export class demo_starter implements Starter {
    name: string = "demo_starter"
    async start(app: App) {
        if (CommonUtils.isDevelopment()) {
            // 开发模式下的逻辑
            const files = await import.meta.glob('../demo/**/*.vue')
            for (const path in files) {
                const url = path.replace("..", "").replace(".vue", "")
                const name = _router_url_to_name(url)
                // console.log(`${path} =>${name} => ${url}`);
                // const component = await files[path]()
                router.addRoute({
                    path: url,
                    name: name,
                    component: files[path]
                    // component: component.default
                })
            }
            _fixRoute(router)
        }
    }
}

function _router_url_to_name(url: string) {
    return url.split('/').filter(Boolean).join("_")
}
function _fixRoute(router) {
    // 解决首次加载时路由不显示的问题
    const hash = window.location.hash?.replace("#", "")
    // console.log(`hash => ${hash}`);
    if (hash) {
        let cp = router?.currentRoute?.value?.path
        if (!_.isEqual(cp, hash)) {
            // console.log(`replace ${cp} => ${hash}`);
            if (_router_url_to_name(hash)) {
                router.replace(hash)
                // console.log(`replace router ${cp} ==> ${hash}`);
            }
        }
    }
}