import _ from "lodash";
import { Starter } from "../type";
import { Logger } from "@/main/common/core/Logger";
import { FileProtocolStarter } from "./FileProtocolStarter";
import { RendererApiStarter } from "./RendererApiStarter";
import { SystemTrayStarter } from "./SystemTrayStarter";
function getStarters(): Starter[] {
    const ret = [
        new RendererApiStarter(),
        new FileProtocolStarter(),
        new SystemTrayStarter()];
    return ret
}

export function start() {

    let starters: Starter[] = getStarters();
    let nstarters = _.orderBy(starters, [
        item => !item.order ? -Infinity : item.order,
        item => item.name
    ], ['asc', 'asc']);
    for (const starter of nstarters) {
        Logger.getLogger("Starter").debug(`start ${starter.name}`)
        starter.start();
    }
}