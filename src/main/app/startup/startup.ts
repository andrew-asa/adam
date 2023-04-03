import renderer_api from "@main/services/renderer_api";
import createTray from "@main/app/menus/tray";
import { registerApp } from "@main/app/applistener";

/**
 * 应用初始化
 */
export function setupApp(app: Electron.App) {
    registerApp(app);
    createTray();
    renderer_api.setup();
}