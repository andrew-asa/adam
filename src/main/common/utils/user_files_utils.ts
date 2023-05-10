import path from "path";
import fs from "fs";
import { CONFIGURE_DIR, apps_user_files } from "@main/common/common_const";
/**
 * .adam 文件夹下的文件管理工具类
 * 如保存窗口状态的window-state.json
 * 
 */


/**
 * @Author andrew
 * @Description
 * @Date 2023-03-26 09:49:25
 */
export function getUserFile(fileName: string) {
    return path.join(CONFIGURE_DIR, fileName);
}
/**
 * @Author andrew
 * @deprecated 用户控件是否存在文件 比如 window-state.json
 */
export function existsUserFile(fileName: string) {
    return !fs.existsSync(getUserFile(fileName))
}
export function writerUserFileObject(fileName: string, obj: any) {
    // Save state
    try {
        const data = JSON.stringify(obj);
        fs.writeFileSync(getUserFile(fileName), data)
    } catch (err) {
        console.log(`Error: save file ${fileName}`);
    }
}
export function readUserFileObject(fileName: string) {
    var data = {}
    try {
        const s = fs.readFileSync(getUserFile(fileName), 'utf8')
        data = JSON.parse(s)
    } catch (err) {
        console.log(`Error: read file file ${fileName}`);
    }
    return data
}

export function backupAppList(apps) {
    const now = new Date();
    const s = now.getTime()
    const bp = {
        apps: apps,
        time: s
    }
    writerUserFileObject(apps_user_files.apps_list, bp)
}

export function readAppListFromFile() {
    return readUserFileObject(apps_user_files.apps_list)
}
