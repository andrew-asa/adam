import { SystemApp } from "@/common/core/plugins";
import { AppServices } from "./AppServices";
import { spawn } from "child_process";

export class AbstractAppServices implements AppServices {
    openApp(app: SystemApp) {
        throw new Error("Method not implemented.");
    }
    getApps(resolve, reject, filterByAppName = false) {
        resolve([]);
    }
    public openFile(path: string) {
    }


    evalCommand(command: string, arg: string[], conf?: {
        exit?: (code: number | null, signal: NodeJS.Signals | null) => void,
        error?: (err: Error) => void,
        data?: (chunk: any) => void,
    }) {
        const cmd = spawn(command, arg || []);
        if (conf && conf.exit) {
            cmd.on("exit", conf.exit);
        }
        if (conf && conf.error) {
            cmd.on("error", conf.error);
        }
        if (conf && conf.data) {
            cmd.stdout.on("data", conf.data);
        }
    }
}