import winston from 'winston';
//import logrotateStream from 'logrotate-stream';
import path from 'path';
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
        winston.format.printf(
            (info) => {
                const formattedTimestamp = moment(info.timestamp).tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY HH:mm:ss');
                console.log(formattedTimestamp)
                return `timestamp: ${formattedTimestamp}| level: ${info.level}| ${info.message}`
            }
        )
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            level: 'info',  // Xác định mức log cho transport này
            frequency: '24h', // Xác định tần suất tạo file log mới
            dirname: logDirectory,
            filename: 'access-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});
// Tạo một stream cho morgan
logger.stream = {
    write: function (message) {
        logger.info(message.trim());
    }
};
export default logger;
