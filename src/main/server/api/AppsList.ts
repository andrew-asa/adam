import { api_urls } from "@/common/common_const";
import { ApiResponse } from "./ApiResponse";
import { getApps } from "@main/services/appsearch/index"
export class AppsList implements ApiResponse {
    method = "get"
    path = api_urls.get_apps
    async action(ctx: any) {
        const apps = await getApps()
        ctx.body = apps;
    }
}
