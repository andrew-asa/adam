import { ApiResponse } from "./ApiResponse";

export class AppsList implements ApiResponse {
    method = "get"
    path = "/apps/get"
    action(ctx: any) {
        const data = {
            name: 'John Doe12',
            age: 33,
            email: 'johndoe@example.com'
        };
        ctx.body = data;
    }
}
