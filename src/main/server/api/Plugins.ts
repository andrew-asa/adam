import { api_urls } from "@/common/common_const";
import { ApiResponse } from "./ApiResponse";
import { AdamPlugin } from "@/common/core/plugins";
export class Plugins implements ApiResponse {
    actions = [
        {
            method: "get",
            path: api_urls.get_plugin_list,
            action: async (ctx: any) => {
                ctx.body = [];
            }
        },
        {
            method: "post",
            path: api_urls.open_plugin,
            action: async (ctx: any) => {
                const p = ctx.request.body as AdamPlugin;
                ctx.body = [];
            }
        },
        {
            method: "post",
            path: api_urls.close_plugin,
            action: async (ctx: any) => {
                const p = ctx.request.body as AdamPlugin;
                ctx.body = {};
            }
        }
    ]
}