"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
const uuid_1 = require("uuid");
const logDir = path_1.default.join(process.cwd(), `../${process.env.LOG_FILE_PATH}`);
const oneDay = 24 * 60 * 60 * 1000;
const testPeriod = 20 * 1000;
const startFrom = { hour: 23, min: 0, sec: 0, ms: 0 };
const cleanupPeriod = oneDay;
const logRecordExpireTime = 3 * oneDay;
if (!fs_1.default.existsSync(logDir))
    fs_1.default.mkdirSync(logDir, { recursive: true });
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const getLogFilePath = () => path_1.default.join(logDir, `applog-${year}-${month}-${day}.log`);
const logFilePath = getLogFilePath();
const pinoLogger = (0, pino_1.default)({ level: 'debug' }, pino_1.default.destination({ dest: logFilePath, sync: true }));
setInterval(() => pinoLogger.flush(), 5000);
const cleanupOldLogs = () => {
    const files = fs_1.default.readdirSync(logDir);
    const cutoffTime = Date.now() - logRecordExpireTime;
    const currentFile = logFilePath.split("\\")[logFilePath.split("\\").length - 1];
    files.forEach(file => {
        const filePath = path_1.default.join(logDir, file);
        const stats = fs_1.default.statSync(filePath);
        if (stats.isFile()) {
            if (file !== currentFile) {
                fs_1.default.unlinkSync(filePath);
            }
            else {
                const fileData = fs_1.default.readFileSync(filePath, 'utf8');
                const logs = fileData.split('\n').filter(line => {
                    try {
                        const log = JSON.parse(line);
                        return log.time >= cutoffTime;
                    }
                    catch (e) {
                        return false;
                    }
                });
                fs_1.default.writeFileSync(filePath, logs.join('\n'), 'utf8');
            }
        }
    });
};
const scheduleCleanup = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(startFrom.hour, startFrom.min, startFrom.sec, startFrom.ms);
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    setTimeout(() => {
        cleanupOldLogs();
        setInterval(cleanupOldLogs, cleanupPeriod);
    }, timeUntilMidnight);
};
const requestId = (0, uuid_1.v4)();
class TypeORMLogger {
    log(level, message) {
        if (level === 'query' || level === 'schema')
            pinoLogger.debug(message);
        else if (level === 'warn')
            pinoLogger.warn(message);
        else if (level === 'error')
            pinoLogger.error(message);
        else
            pinoLogger.info(message);
        pinoLogger.flush();
    }
    logQuery(query, parameters) {
        pinoLogger.debug(`Query: ${query},"X-Request-ID": ${requestId},"time": ${new Date().toISOString()}, Params: ${JSON.stringify(parameters)}`);
        pinoLogger.flush();
    }
    logQueryError(error, query, parameters) {
        pinoLogger.error(`Query Error: ${error},"X-Request-ID": ${requestId},"time": ${new Date().toISOString()}, Query: ${query}, Params: ${JSON.stringify(parameters)}`);
        pinoLogger.flush();
    }
    logQuerySlow(time, query, parameters) {
        pinoLogger.warn(`Slow Query: ${time}ms,"X-Request-ID": ${requestId},"time": ${new Date().toISOString()}, Query: ${query}, Params: ${JSON.stringify(parameters)}`);
        pinoLogger.flush();
    }
    logSchemaBuild(message) {
        pinoLogger.debug(`Schema Build: ${message},"X-Request-ID": ${requestId},"time": ${new Date().toISOString()}`);
        pinoLogger.flush();
    }
    logMigration(message) {
        pinoLogger.info(`Migration: ${message},"X-Request-ID": ${requestId},"time": ${new Date().toISOString()}`);
        pinoLogger.flush();
    }
}
exports.TypeORMLogger = TypeORMLogger;
process.on('SIGINT', async () => {
    pinoLogger.info('Shutting down gracefully...');
    await pinoLogger.flush();
    process.exit(0);
});
//# sourceMappingURL=typeormLogger.js.map