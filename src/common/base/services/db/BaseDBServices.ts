import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { BaseServices } from "../BaseServices";

/**
 * 数据库控制器
 * ==> main/services/DBServices
 * @example ctx.services.db.xxx()
 */
export class BaseDBServices extends BaseServices{
    serviceName: string = services_name.db_services;
    getPluginName(): string {
        return "main";
    }

    /**
     * @description 插入数据
     * @param name 数据key值
     * @param data 数据 一个json数据
     */
    add(name, data: any) {
        return this.invoke("add", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }
    /**
     * @description 更新数据
     * @param name 数据key值
     * @param data 数据
     */
    put(name, data: any) {
        return this.invoke("put", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }
    /**
     * @description 删除数据
     * @param name 数据key值
     */
    delete(name) {
        return this.invoke("delete", {
            name: name,
            prefix: this.getDbPrefix(),
        });
    }
    /**
     * @description 更新数据
     * @param name 数据key值
     */
    update(name, data: any) {
        return this.invoke("update", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }
    /**
     * @description 获取数据
     * @param name 数据key值
     */
    get(name) {
        return this.invoke("get", {
            name: name,
            prefix: this.getDbPrefix(),
        });
    }
    /**
     * @ignore
     */
    protected getDbPrefix(): string[] {
        return [];
    }
}
