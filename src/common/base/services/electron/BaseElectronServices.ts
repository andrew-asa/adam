import { services_name } from "@/common/common_const";
import { invokeMessage } from "@/common/base/Renderer";
import { ServicesProvider } from "@/common/core/types";

/**
 * electron 相关操作
 * ==> main/services/ElectronServices
 */
export class BaseElectronServices implements ServicesProvider{

    writeText(text: string) {
        return this.invoke("writeText", text);
    }

    readText(type?: 'selection' | 'clipboard') {
        this.invoke("readText", type);
    }


    invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: services_name.electron_services,
        });
    }
}
