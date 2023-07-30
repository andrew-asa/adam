import { BaseDBServices } from "./BaseDBServices";

export class AppDBServices extends BaseDBServices {

    public findStrartWithName(name) {
        return this.invoke("findStrartWithName", {
            name: name,
            prefex: [this.getPluginName()],
        });
    }

    public getAllDocs(option?: {
        include_docs?: boolean,
        [key: string]: any
    }) {
        return this.invoke("getAllDocs", option || {});
    }
}