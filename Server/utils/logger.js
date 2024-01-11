import winston from 'winston';
import fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from "moment-timezone";

const logDirectory = "./logs"
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5
    },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.printf(
            (info) => {
                if (info instanceof Error) {
                    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack}`;
                }
                const formattedTimestamp = moment(info.timestamp).tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY HH:mm:ss');
                console.log(formattedTimestamp)
                return `timestamp: ${formattedTimestamp}| level: ${info.level}| ${info.message}`
            }
        )
    ),
    transports: [
        // Console transport
        new winston.transports.Console(),

        // Access log file transport
        new DailyRotateFile({
            level: 'info',
            frequency: '24h',
            dirname: logDirectory,
            filename: 'access-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d'
        }),

        // Error log file transport
        new DailyRotateFile({
            level: 'error',
            frequency: '24h',
            dirname: logDirectory,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});

// Stream for Morgan
logger.stream = {
    write: function (message) {
        logger.info(message.trim());
    }
};

export default logger;
