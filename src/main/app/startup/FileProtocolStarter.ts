
import { backendpor } from "@/common/common_const";
import { Starter } from "../type";
import { CONFIGURE_DIR } from "@/main/common/common_const";
import { protocol } from "electron";
import path from "path";
export class FileProtocolStarter implements Starter {
    
    name = "FileProtocolStarter";
    start() {
        // <a href="files:///path/to/file.txt">Link to File</a>
        protocol.registerFileProtocol('files', (request, callback) => {
            // url需要解码，要不然中文名有问题
            const filePath = decodeURIComponent(request.url.replace('files://', ''));
            const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
            const fullPath = path.join(CONFIGURE_DIR, safePath);
            callback({ path: fullPath });
        });
    }
}