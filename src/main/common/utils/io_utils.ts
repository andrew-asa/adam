import * as path from "path";
import * as fs from "fs"

/**
 * 逐级创建目录
 * @param {string} dirPath 要创建的目录路径
 */
export function createDir(basePath, subPath) {
    const parts = subPath.split(path.sep).filter(item => item);
    for (let i = 1; i <= parts.length; i++) {
        const p = path.join(basePath, ...parts.slice(0, i));
        console.log(p);
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
}
