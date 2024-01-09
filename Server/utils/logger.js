import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        // Access log file transport
        new DailyRotateFile({
            level: 'info',
            filename: 'logs/access-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        }),
        // Error log file transport
        new DailyRotateFile({
            level: 'error',
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        })
    ]
});

// Filtering logs based on level
logger.add(new winston.transports.File({
    filename: 'logs/combined.log',
    level: 'info',
    handleExceptions: true,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
}));

// Morgan stream
logger.stream = {
    write: function (message, encoding) {
        logger.info(message.trim());
    }
};

export default logger;
