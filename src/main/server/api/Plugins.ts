import { api_urls } from "@/common/common_const";
import { ApiResponse } from "./ApiResponse";
import { getPlugins, openPlugin } from "@/main/services/plugins";
export class Plugins implements ApiResponse {
    actions = [
        {
            method: "get",
            path: api_urls.get_plugin_list,
            action: async (ctx: any) => {
                const apps = await getPlugins()
                ctx.body = apps;
            }
        },
        {
            method: "post",
            path: api_urls.open_plugin,
            action: async (ctx: any) => {
                const p = ctx.request.body as plugin;
                ctx.body = openPlugin(p);
            }
        }
    ]
}