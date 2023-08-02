import { clipboard } from "electron";
import { ServicesProvider } from "@/common/core/types";
export class ElectronServices implements ServicesProvider {
    writeText(text: string) {
        clipboard.writeText(text);
    }

    readText(type?: 'selection' | 'clipboard'): string {
        return clipboard.readText(type);
    }

    popupShareMenu() {
    }
}