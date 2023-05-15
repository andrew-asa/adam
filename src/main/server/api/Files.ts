import path from "path";
import { promises as fs } from 'fs';
import { ApiResponse } from "./ApiResponse";
import { api_urls } from "@/common/common_const"
import { CONFIGURE_DIR } from "@/main/common/common_const";
/**
 * 文件获取
 * .adam文件夹下的文件获取
 */
interface ExtResourceProcess {
    needProcess(ext: string, ctx: any): boolean;
    process(filePath: string, ctx: any);
}
class BaseExtResourceProcess implements ExtResourceProcess {
    needProcess(ext: string, ctx: any): boolean {
        if (ext) {
            return ext.split(';').filter((item) => {
                return item.trim().toLocaleLowerCase() === ext.toLocaleLowerCase()
            }).length > 0
        }
        return false
    }
    async process(filePath: string, ctx: any) {

        try {
            const url = path.join(CONFIGURE_DIR, filePath);
            const fileContent = await fs.readFile(url);
            ctx.response.type = this.getContentType();
            ctx.response.body = fileContent;
        } catch (err) {
            console.error(err);
            ctx.status = 500;
            ctx.body = 'Internal server error';
        }
    }

    getContentType() {
        return "text/html";
    }

    getExtension() {
        return ".html;.txt";
    }

    getResourcePath(ctx:any) {
        const { path: filePath } = ctx.query;
        return filePath;
    }
}
class PngProcess extends BaseExtResourceProcess {
    getExtension(): string {
        return ".png";
    }
    getContentType(): string {
        return "image/png";
    }
}

class IconCacheProcess extends PngProcess {
    needProcess(ext: string,ctx: any): boolean {
        if(super.needProcess(ext,ctx)){
            var path = this.getResourcePath(ctx);
            if(path && path.startwith('/')){
                return true;
            }
            return false;
        }
        return false;
    }
}

export class Files implements ApiResponse {
    method = "get"
    path = api_urls.get_file
    private exstProcess
    constructor() {
        this.exstProcess = [
            new PngProcess(),
            new IconCacheProcess()
        ]
    }
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
        var hasProcess = false;
        for (var exstProces of this.exstProcess) {
            if (exstProces.needProcess(ext, ctx)) {
                exstProces.process(filePath, ctx);
                hasProcess = true;
            }
        }
        if (!hasProcess) {
            ctx.status = 415;
            return;
        }
        // let contentType;
        // if (ext === '.png') {
        //     contentType = 'image/png';
        // } else if (ext === '.css') {
        //     contentType = 'text/css';
        // } else if (ext === '.html') {
        //     contentType = 'text/html';
        // } else {
        //     ctx.status = 415;
        //     return;
        // }
        // try {
        //     const url = path.join(CONFIGURE_DIR, filePath);
        //     const fileContent = await fs.readFile(url);
        //     ctx.response.type = contentType;
        //     ctx.response.body = fileContent;
        // } catch (err) {
        //     console.error(err);
        //     ctx.status = 500;
        //     ctx.body = 'Internal server error';
        // }
    }
}
