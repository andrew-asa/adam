import renderer_api from "@/main/services/renderer_api";
import { Starter } from "../type";

export class RendererApiStarter implements Starter {
    static order = 1
    name = "RendererApiStarter";
    start() {
        renderer_api.setup();
    }
}