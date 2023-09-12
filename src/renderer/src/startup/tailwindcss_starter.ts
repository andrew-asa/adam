import { App } from "vue";
import { Starter } from "./starter";
import "tailwindcss/tailwind.css"
export class tailwindcss_starter implements Starter {
    name: string = "tailwindcss_starter"
    start(app: App) {
        console.log(`start tailwindcss_starter`);
    }
}