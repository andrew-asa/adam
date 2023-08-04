import { App } from "vue";
import { starter } from "./starter";
import "tailwindcss/tailwind.css"
export class tailwindcss_starter implements starter {
    name: string = "tailwindcss_starter"
    start(app: App) {
        console.log(`start tailwindcss_starter`);
    }
}