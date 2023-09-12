import { BrowserWindow } from "electron";

export interface WindowCreator {
    init: () => void;
    getWindow: () => BrowserWindow | null;
}

export interface Starter {
    name: string;
    order?: number;
    start(): void;
}