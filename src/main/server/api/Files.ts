import path from "path";
import { promises as fs } from 'fs';
import { ApiResponse } from "./ApiResponse";
import { api_urls } from "@/common/common_const"
import { CONFIGURE_DIR } from "@/main/common/common_const";
/**
 * 文件获取
 * .adam文件夹下的文件获取
 */

export class Files implements ApiResponse {
    method = "get"
    path = api_urls.get_file
    async action(ctx: any) {
        const { path: filePath } = ctx.query;
        if (!filePath) {
            ctx.status = 400;
            return;
        }
        const ext = path.extname(filePath);
        if (/\.+\//.test(filePath)) {
            throw new Error('Invalid file path');
        }
        let contentType;
        if (ext === '.png') {
            contentType = 'image/png';
        } else if (ext === '.css') {
            contentType = 'text/css';
        } else if (ext === '.html') {
            contentType = 'text/html';
        } else {
            ctx.status = 415;
            return;
        }
        try {
            const url = path.join(CONFIGURE_DIR, filePath);
            const fileContent = await fs.readFile(url);
            ctx.response.type = contentType;
            ctx.response.body = fileContent;
        } catch (err) {
            console.error(err);
            ctx.status = 500;
            ctx.body = 'Internal server error';
        }
    }
}
