import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";

/**
 * 数据库控制器
 * ==> main/services/DBServices
 */
export class BaseDBServices {

    getPluginName(): string {
        return "main_window";
    }


    add(name, data: any) {
        return this.invoke("add", {
            name: name,
            doc: data,
            prefix: [this.getPluginName()],
        });
    }

    put(name, data: any) {
        return this.invoke("put", {
            name: name,
            doc: data,
            prefix: [this.getPluginName()],
        });
    }

    delete(name) {
        return this.invoke("delete", {
            name: name,
            prefix: [this.getPluginName()],
        });
    }
    update(name, data: any) {
        return this.invoke("update", {
            name: name,
            doc: data,
            prefix: [this.getPluginName()],
        });
    }

    get(name) {
        return this.invoke("get", {
            name: name,
            prefix: [this.getPluginName()],
        });
    }


    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.db_services,
            from: this.getPluginName(),
        });
    }
}
