import { PluginContainerLifeCycle, ThirdPlugin } from "@/common/core/plugins";
import { BaseDBServices } from "./BaseDBServices";
import { getStore } from "../../store";
import { db_prefix, export_stores_name } from "@/common/common_const";
/**
 * 数据库操作相关
 * 
 * @example ctx.services.db.xxx()
 */
export class PluginDBServices extends BaseDBServices {
    pluginName: string = "";
    constructor() {
        super();
    }

    getPluginName(): string {
        const p = getStore(export_stores_name.current_plugin);
        if (p) {
            return p.name
        }
        throw new Error("plugin state is null")
    }


    protected  getDbPrefix(): string[] {
        return [db_prefix.plugin_db, this.getPluginName()];
    }
}