import _ from "lodash"
import { createRouter, createWebHashHistory } from "vue-router"
const routes = [{
    path: "/",
    name: "home",
    component: () => import("@renderer/components/search/index.vue")
}, {
    path: "/search",
    name: "search",
    component: () => import("@renderer/components/search/index.vue")
}, {
    path: "/browser",
    name: "browser",
    component: () => import("@renderer/components/browser/index.vue")
},{
    path: "/search/plugins/market",
    name: "search_plugins_market",
    component: () => import("@renderer/components/search/plugins/market/index.vue")
}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export function switchToRoute(path: string) {
    router.push({ path: path })
}
// addDemoRoutes()
export default router
export { routes, router }