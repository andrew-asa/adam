import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";

/**
 * 数据库控制器
 * ==> main/services/DBServices
 */
export class BaseDBServices {

    getPluginName(): string {
        return "main";
    }


    add(name, data: any) {
        return this.invoke("add", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }

    put(name, data: any) {
        return this.invoke("put", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }

    delete(name) {
        return this.invoke("delete", {
            name: name,
            prefix: this.getDbPrefix(),
        });
    }
    update(name, data: any) {
        return this.invoke("update", {
            name: name,
            doc: data,
            prefix: this.getDbPrefix(),
        });
    }

    get(name) {
        return this.invoke("get", {
            name: name,
            prefix: this.getDbPrefix(),
        });
    }


    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.db_services,
            from: this.getPluginName(),
        });
    }

    getDbPrefix(): string[] {
        return [];
    }
}
