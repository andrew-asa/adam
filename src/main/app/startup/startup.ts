import renderer_api from "@main/services/renderer_api";
import createTray from "@main/app/menus/tray";
import { registerApp } from "@main/app/applistener";
import server from "@/main/server/server";
function startServer(){
    try{
        const handler = server(3003);
    }catch(err){
        console.log("服务器启动失败",err);
    }
}
/**
 * 应用初始化
 */
export function setupApp(app: Electron.App) {
    // 注册应用
    registerApp(app);
    // 创建托盘
    createTray();
    // 提供给前端的接口
    renderer_api.setup();
    // 启动后端服务器提供服务
    startServer();
}

