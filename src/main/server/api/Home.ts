import { ApiResponse } from "./ApiResponse";
import { api_urls } from "@/common/common_const"


export class Home implements ApiResponse {
    method = "get"
    path = api_urls.home
    constructor() {

    }
    action(ctx: any) {
        console.log(`home`);
        if (process.env['ELECTRON_RENDERER_URL']) {
            ctx.redirect(process.env['ELECTRON_RENDERER_URL']);
        }else{
            ctx.body = 'Hello, Koa';
        }
    }
}
