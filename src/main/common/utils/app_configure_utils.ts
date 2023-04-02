import path from "path";
import fs from "fs";
import _ from 'lodash';

import { CONFIGURE_DIR, CONFIGURE_PATH, DEFAULT_CONFIG } from "@main/common/common_const";

/**
 * @Author andrew
 * @Description 获取用户存放数据目录
 * @Date 2023-03-26 09:49:25
 */
export function getUserDataDir() {

    if (!fs.existsSync(CONFIGURE_DIR)) {
        console.log(`创建应用数据存放路径${CONFIGURE_DIR}`);
        fs.mkdirSync(CONFIGURE_DIR);
    }
    return CONFIGURE_DIR;
}

/**
 * @Author andrew
 * @Description
 * @Date 2023-03-26 09:49:25
 */
export function getLocalDataFile(fileName: string) {
    return path.join(getUserDataDir(), fileName);
}
export const config_path = getLocalDataFile(CONFIGURE_PATH);
let config = {}
/**
 * @Author andrew
 * @Description
 * @Date 2023-03-26 10:27:04
 */
export function get() {
    if (_.isEmpty(config)) {
        try {
            config = JSON.parse(fs.readFileSync(config_path, 'utf-8'));
        } catch (e) {
            console.log(`读取配置文件失败，请检查配置文件路径是否正确，详细信息：${config_path}`);
            config = DEFAULT_CONFIG;
        }
    }
    return config;
}

export function set(value) {
    config = {
        ...config,
        ...value
    }
    try {
        fs.writeFileSync(getLocalDataFile(config_path), JSON.stringify(config));
    } catch (e) {
        console.log(`写入配置文件失败，请检查配置文件路径是否正确，详细信息：${config_path}`);
    }
}


