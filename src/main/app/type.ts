import { BrowserWindow } from "electron";

export interface WindowCreator {
    init: () => void;
    getWindow: () => BrowserWindow | null;
}

/**
 * 启动器
 */
export interface Starter {
    start(): void
}