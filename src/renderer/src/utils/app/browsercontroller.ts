export interface Action {
    action(type: string, data: any): void;
}
export interface Controller {
    openConsole(): void;
    forward(): void;
    back(): void;
}

export class BrowserController implements Action, Controller {
    constructor() {
    }
    openConsole(): void {
        console.log("BrowserController openConsole");
    }
    forward(): void {
        history.go(1)
    }
    back(): void {
        history.go(-1)
    }
    home(): void {
        
    }
    refresh(): void {
        history.go(0)
    }
    action(action: string, data: any) {
        // console.log(action, data);
        const fn = this[action];
        fn && fn(data);
    }
} 