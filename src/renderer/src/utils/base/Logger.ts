export class Logger {

    static getLogger(subject: string) {
        const logger = (level: string) => (...args: any) => {
            const time = `${new Date().toLocaleString()}.${Date.now() % 1000}`
                ; (console as any)[level](`[${time}] [${level}] ${subject} >`, ...args)
        }

        return {
            debug: true ? logger('debug') : () => 0,
            log: logger('log'),
            info: logger('info'),
            warn: logger('warn'),
            error: logger('error')
        }
    }
}