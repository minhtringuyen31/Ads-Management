import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

// Đường dẫn đến thư mục log
const logDirectory = path.join(__dirname, 'logs/api');

// Kiểm tra xem thư mục log có tồn tại không
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true }); // Tạo thư mục
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
        new DailyRotateFile({
            filename: 'logs/api/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d',
        }),
    ],
});
// Tạo một stream cho morgan
logger.stream = {
    write: function (message) {
        logger.info(message.trim());
    }
};
export default logger;