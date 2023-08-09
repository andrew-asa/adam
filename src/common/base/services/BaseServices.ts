import { ServicesProvider } from "@/common/core/types";
import { invokeMessage } from "../Renderer";

export class BaseServices implements ServicesProvider {
    serviceName: string = "base_services";
    protected invoke(name: string, data: any) {
        return invokeMessage(name, data, {
            services: this.serviceName,
        });
    }
}