import { ApiResponse } from "./ApiResponse";
import { AppsList } from "./AppsList";
const base_path = "/api"
function registerApi(router, api: ApiResponse) {
    if (api.action && (api.method === "get" || api.method === "post")) {
        const method = (api.method || "get").toLocaleLowerCase()
        const path = base_path + api.path
        console.log(`register api ${method} ${path}`)
        router[method](path, api.action)
    } else if (api.actions) {
        api.actions.forEach(item => {
            registerApi(router, item)
        })
    }
}
function registerApis(router) {
    const list = [
        new AppsList()
    ]
    list.forEach(item => {
        registerApi(router, item)
    })
}
export default registerApis;