import { api_urls } from "@/common/common_const";
import { ApiResponse } from "./ApiResponse";
import { getApps } from "./appsearch/index"
export class Plugins implements ApiResponse {
    method = "get"
    path = api_urls.get_plugin
    async action(ctx: any) {
        const apps = await getApps()
        ctx.body = apps;
    }
}