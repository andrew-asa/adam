import { App } from "vue";

export interface Starter {
    name: string;
    start(app: App): void;
}