import { ApiResponse } from "./ApiResponse";
import { getApps } from "./appsearch/index"
export class AppsList implements ApiResponse {
    method = "get"
    path = "/apps/get"
    async action(ctx: any) {
        const apps = await getApps()
        // console.log(apps)
        const data = {
            name: 'John Doe12',
            age: 33,
            email: 'johndoe@example.com'
        };
        ctx.body = apps;
    }
}
