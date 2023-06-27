import { ThirdPlugin, ThirdPluginManager } from "@/common/core/plugins";
import { DEFAULT_PLUGIN_REGISTRY, PLUGINS_INSTALL_DIR } from "@/main/common/common_const";
import { spawn } from "child_process";
import fs from 'fs-extra';
import axios from "axios";
import { DefaultThirdPluginManager } from "../manager/AbstractThirdPluginManager";
/**
 * rubick插件管理器
 */
export class RubickPluginManager extends DefaultThirdPluginManager implements ThirdPluginManager {
    constructor(options: { baseDir?: string, registry?: string }) {
        super(options);
    }
    needHandle(plugin: ThirdPlugin): boolean {
        return (plugin && plugin.ext && plugin.ext.adapterEngine && plugin.ext.adapterEngine === "rubick") as boolean;
    }
    listAllPlugin(): ThirdPlugin[] {
        throw new Error("Method not implemented.");
    }
}