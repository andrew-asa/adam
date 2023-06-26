import renderer_api from "@main/services/renderer_api";
import createTray from "@main/app/menus/tray";
import server from "@/main/server/server";
import { backendpor } from "@/common/common_const";
import { Starter } from "../type";
import { AppControllerContext } from "@/main/services/AppControllerContext";
import { registerStore } from "@/main/common/strore";
import { stores_name } from "@/main/common/common_const";
function startServer() {
    try {
        const handler = server(backendpor);
    } catch (err) {
        console.log("服务器启动失败", err);
    }
}


export class AppStarter implements Starter {

    registerGlobalStore() {

        registerStore(stores_name.app_controller_context, new AppControllerContext())
    }
    /**
     * 应用，窗口都启动好之后的启动逻辑
     */
    start() {
        // 创建托盘
        createTray();
        // 提供给前端的接口
        renderer_api.setup();
        // 启动后端服务器提供服务
        startServer();
        this.registerGlobalStore();
    }
}
