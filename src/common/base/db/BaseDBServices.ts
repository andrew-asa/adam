import { services_name } from "@/common/common_const";
import { invokeMessage } from "../Renderer";

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
            prefex: [this.getPluginName()],
        });
    }

    put(name, data: any) {
        return this.invoke("put", {
            name: name,
            doc: data,
            prefex: [this.getPluginName()],
        });
    }

    delete(name) {
        return this.invoke("delete", {
            name: name,
            prefex: [this.getPluginName()],
        });
    }
    update(name, data: any) {
        return this.invoke("update", {
            name: name,
            doc: data,
            prefex: [this.getPluginName()],
        });
    }

    get(name) {
        return this.invoke("get", {
            name: name,
            prefex: [this.getPluginName()],
        });
    }


    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.db_services,
            from: this.getPluginName(),
        });
    }
}
