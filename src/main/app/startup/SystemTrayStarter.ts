import createTray from "../menus/tray";
import { Starter } from "../type";
import { RendererApiStarter } from "./RendererApiStarter";

export class SystemTrayStarter implements Starter {
    order = RendererApiStarter.order + 1
    name = "SystemTrayStarter";
    start() {
        createTray()
    }
}