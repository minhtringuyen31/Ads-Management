

import express from "express";
import fs from "fs";
import readline from "readline";
import moment from "moment-timezone";
const router = express.Router();
function parseLogString(logString) {
    // Split the log string into its components
    const parts = logString.split('|').map(part => part.trim());

    // Extract timestamp and level
    const timestamp = parts[0].split('timestamp: ')[1];
    const level = parts[1].split('level: ')[1];

    // Extract the status, request, and message using a regular expression
    const regex = /(\[.*?\]) "(.*?)" (\d{3})/;
    const match = parts[2].match(regex);

    let status, request, message;
    if (match) {
        request = match[2];
        status = match[3];
        message = parts[2];
    }

    return { timestamp, level, status, request, message };
}

router.post("/search-logs", (req, res) => {
    console.log("jộ");
    const { statusCode, level, from, to } = req.body;
    const fromDate = new Date(from)
    const toDate = new Date(to)

    let allLogs = [];
    const logDirectory = "./logs"; // Đường dẫn tới thư mục chứa tệp log
    const logFiles = fs.readdirSync(logDirectory); // Lấy danh sách tất cả các tệp trong thư mục
    let filesProcessed = 0; //số lượng file log đã duyệt
    let start = "access";
    if (level === "sql") start = "sql"; // nếu sql thì duyệt file có dạng sql ..... .log
    logFiles
        .filter(
            (logFileName) =>
                logFileName.startsWith(start) && logFileName.endsWith(".log")
        )
        .forEach((logFileName) => {
            const fileStream = fs.createReadStream(`${logDirectory}/${logFileName}`);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            const logs = [];

            rl.on("line", (line) => {  // với mỗi dòng
                const logData = line.split("| ");
                // const logObject = {};
                const logObject = parseLogString(line);
                // logData.forEach((entry) => {
                //     const [key, ...valueParts] = entry.split(": ");
                //     const value = valueParts.join(": ");

                //     logObject[key] = value;
                // });
                console.log(logObject);
                const logDate = new Date(logObject.timestamp);
                if (
                    (!statusCode || logObject.statusCode === statusCode) &&
                    (!level || logObject.level === level) &&
                    (!from || isNaN(new Date(from).getTime()) || logDate >= fromDate) && // check !from hay k -> ngày hợp lệ k -> đièu kiện
                    (!to || isNaN(new Date(to).getTime()) || logDate <= toDate)          // tương tự
                ) {
                    logs.push(logObject);
                }
            });

            rl.on("close", () => {
                allLogs = allLogs.concat(logs); // duyêt xong 1 file log thì nối vào biến allLogs
                // console.log(logs)
                filesProcessed++;
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Content-Type", "application/json");
                res.json({ logs: allLogs });
            });
        });
});

export default router;
