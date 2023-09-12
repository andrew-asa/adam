import _ from "lodash"

export class CommonUtils {
    /**
     * 是否是开发环境
     */
    static isDevelopment(): boolean {
        return import.meta.env.MODE === 'development'
    }

    static isElectron(): boolean {
        return !!((window && (window.process))?.versions?.electron)
    }

    
    static generateRandomString(length: number): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomString = _.sampleSize(charset, length).join('');
        return randomString;
    }

    static copyToClipboard(text: string):Promise<void> {
        return navigator.clipboard.writeText(text);
    }
}


export const emptyFn = () => {

}