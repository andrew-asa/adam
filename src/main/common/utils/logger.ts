import { LOGGER_PATH, MAX_LOG_SIZE } from "../common_const";

interface log {
    info(...args: any[]): void;
    debug(...args: any[]): void;
}
interface LoggerFactory {
    getLogger(name: String): log
}
const consoleLogger = {

}
class consoleLoggerFactory implements LoggerFactory {
    getLogger(name: String): log {
        throw new Error("Method not implemented.");
    }
}
class logger {
    private LOGGER!: LoggerFactory;
    constructor() {
        this.init()
    }
    private init() {
        const log4js = require('log4js');
        log4js.configure({
            appenders: {
                file: {
                    type: 'file',
                    filename: LOGGER_PATH,
                    maxLogSize: MAX_LOG_SIZE,
                }
            },
            categories: {
                default: {
                    appenders: ['file'],
                    level: 'info'
                }
            }
        });
        this.LOGGER = log4js
    }
    getlogger(name: String) {
        return this.LOGGER.getLogger(name)
    }
}
export default new logger();