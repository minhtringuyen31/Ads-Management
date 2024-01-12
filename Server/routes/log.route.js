

import express from "express";
import fs from "fs";
import readline from "readline";
import moment from "moment-timezone";
const router = express.Router();
function parseLogLine(line) {
    const [timestamp, level, status, ...rest] = line.split("|");
    const message = rest.join("|").trim();
    const request = message.split('"')[1];
    return {
        timestamp: timestamp.trim(),
        level: level.trim(),
        status: status.split(':')[1],
        request,
        message
    };
}
router.post("/search-logs", (req, res) => {

    const { statusCode, level, from, to } = req.body;
    console.log("Từ client", req.body);
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
                const logObject = parseLogLine(line);
                const logDate = new Date(logObject.timestamp);
                if (
                    (!statusCode || logObject.status === statusCode) &&
                    (!level || logObject.level === level) &&
                    (!from || isNaN(new Date(from).getTime()) || logDate >= fromDate) && // check !from hay k -> ngày hợp lệ k -> đièu kiện
                    (!to || isNaN(new Date(to).getTime()) || logDate <= toDate)          // tương tự
                ) {
                    logs.push(logObject);
                }
            });

            rl.on("close", () => {

                allLogs = allLogs.concat(logs); // duyêt xong 1 file log thì nối vào biến allLogs
                console.log(allLogs)
                filesProcessed++;
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Content-Type", "application/json");
                res.json({ logs: allLogs });
            });
        });
});

export default router;
