import { App } from "vue";

export interface starter {
    name: string;
    start(app: App): void;
}