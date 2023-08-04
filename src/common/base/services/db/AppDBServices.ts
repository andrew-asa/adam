import { db_prefix } from "@/common/common_const";
import { BaseDBServices } from "./BaseDBServices";

export class AppDBServices extends BaseDBServices {

    public findStrartWithName(name) {
        return this.invoke("findStrartWithName", {
            name: name,
            prefix: [this.getPluginName()],
        });
    }

    public getAllDocs(option?: {
        include_docs?: boolean,
        [key: string]: any
    }) {
        return this.invoke("getAllDocs", option || {});
    }

    getDbPrefix(): string[] {
        return [db_prefix.app_db];
    }

    removeAllDocs(option?: {
        [key: string]: any
    }) {
        return this.invoke("removeAllDocs", option || {});
    }
}