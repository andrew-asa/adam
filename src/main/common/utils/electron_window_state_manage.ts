import { BrowserWindow, screen } from "electron";
import path from "path";
import fs from "fs";
import { getUserDataDir } from "./app_configure_utils";


export class ElectronWindowStateManage {
    private screen: Electron.Screen;
    private win: Electron.BrowserWindow | null;
    private state: any;
    private config: any;
    private fullStoreFileName: string;
    constructor(options: any, win: BrowserWindow) {
        this.win = win;
        this.screen = screen;
        this.config = Object.assign({
            file: 'window-state.json',
            path: getUserDataDir(),
            maximize: false,
            defaultWidth: 800,
            defaultHeight: 600,
            fullScreen: false,
        }, options)
        this.fullStoreFileName = path.join(this.config.path, this.config.file);
        // Load previous state
        this.setState();
    }
    private setState() {
        try {
            const data = fs.readFileSync(this.fullStoreFileName, 'utf8')
            this.state = JSON.parse(data)
        } catch (err) {
        
            // Don't care
            console.log(`Error: ${err}`);
        }

        // Check state validity
        this.validateState();

        // Set state fallback values
        this.state = Object.assign({
            width: this.config.defaultWidth || 800,
            height: this.config.defaultHeight || 600
        }, this.state || {});
    }
    private isNormal(win: any) {
        return !win.isMaximized() && !win.isMinimized() && !win.isFullScreen();
    }

    private hasBounds() {
        return this.state &&
            Number.isInteger(this.state.x) &&
            Number.isInteger(this.state.y) &&
            Number.isInteger(this.state.width) && this.state.width > 0 &&
            Number.isInteger(this.state.height) && this.state.height > 0;
    }

    private validateState() {
        const isValid = this.state && (this.hasBounds() || this.state.isMaximized || this.state.isFullScreen);
        if (!isValid) {
            this.state = null;
            return;
        }

        if (this.hasBounds() && this.state.displayBounds) {
            this.ensureWindowVisibleOnSomeDisplay();
        }
    }

    private ensureWindowVisibleOnSomeDisplay() {
        const visible = this.screen.getAllDisplays().some(display => {
            return this.windowWithinBounds(display.bounds);
        });

        if (!visible) {
            // Window is partially or fully not visible now.
            // Reset it to safe defaults.
            return this.resetStateToDefault();
        }
    }

    private windowWithinBounds(bounds: any) {
        return (
            this.state.x >= bounds.x &&
            this.state.y >= bounds.y &&
            this.state.x + this.state.width <= bounds.x + bounds.width &&
            this.state.y + this.state.height <= bounds.y + bounds.height
        );
    }

    public resetStateToDefault() {
        const displayBounds = this.screen.getPrimaryDisplay().bounds;

        // Reset state to default values on the primary display
        this.state = {
            width: this.config.defaultWidth || 800,
            height: this.config.defaultHeight || 600,
            x: 0,
            y: 0,
            displayBounds
        };
    }
    private updateState(win: BrowserWindow | null) {
        win = win || this.win;
        if (!win) {
            return;
        }
        // Don't throw an error when window was closed
        try {
            const winBounds = win.getBounds();
            if (this.isNormal(win)) {
                this.state.x = winBounds.x;
                this.state.y = winBounds.y;
                this.state.width = winBounds.width;
                this.state.height = winBounds.height;
            }
            this.state.isMaximized = win.isMaximized();
            this.state.isFullScreen = win.isFullScreen();
            this.state.displayBounds = this.screen.getDisplayMatching(winBounds).bounds;
        } catch (err) {
            // Ignore
        }
    }
    public saveState(win: BrowserWindow | null) {
        // Update window state only if it was provided
        if (win) {
            this.updateState(win);
        }

        // Save state
        try {
            const data = JSON.stringify(this.state)
            // console.log(`Saving window state to ${this.fullStoreFileName} \n${data}`);
            fs.writeFileSync(this.fullStoreFileName, data)
        } catch (err) {
            // Don't care
            console.log(`Error: ${err}`);
        }
    }

    public manage(win: BrowserWindow) {
        let winRef = win;
        let ss = this.saveState.bind(this);
        let um = this.unmanage.bind(this);
        // ts-ignore
        win.on('close', () => {
            const position = winRef.getPosition()
            this.state.x = position[0]
            this.state.y = position[1]
            ss(winRef);
            um();
        });
    }



    public unmanage() {
        if (this.win) {
            // this.win.removeListener('resize', this.stateChangeHandler);
            this.win = null;
        }
    }
    public loadState(win: BrowserWindow) {
        // 先只是装载postion
        if (this.getX() && this.getY() && this.getWidth() && this.getHeight()) {
            win.setPosition(this.getX(), this.getY())
        }
    }
    public getX() { return this.state.x; }
    public getY() { return this.state.y; }
    public getWidth() { return this.state.width; }
    public getHeight() { return this.state.height; }
    public getDisplayBounds() { return this.state.displayBounds; }
    public isMaximized() { return this.state.isMaximized; }
    public isFullScreen() { return this.state.isFullScreen; }
}     