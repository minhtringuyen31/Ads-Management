

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

router.post("/search-logs", async (req, res) => {
    try {
        const { statusCode, level, from, to } = req.body;
        console.log("Từ client", req.body);

        const fromDate = new Date(from);
        const toDate = new Date(to);

        let allLogs = [];
        const logDirectory = "./logs"; // Đường dẫn tới thư mục chứa tệp log
        const logFiles = fs.readdirSync(logDirectory); // Lấy danh sách tất cả các tệp trong thư mục

        let start = "access";
        if (level === "sql") start = "sql"; // nếu sql thì duyệt file có dạng sql ..... .log

        const processLogFile = async (logFileName) => {
            return new Promise((resolve, reject) => {
                const fileStream = fs.createReadStream(`${logDirectory}/${logFileName}`);
                const rl = readline.createInterface({
                    input: fileStream,
                    crlfDelay: Infinity,
                });

                const logs = [];

                rl.on("line", (line) => {
                    const logObject = parseLogLine(line);
                    const logDate = new Date(logObject.timestamp);
                    if (
                        (!statusCode || logObject.status === statusCode) &&
                        (!level || logObject.level === level) &&
                        (!from || isNaN(new Date(from).getTime()) || logDate >= fromDate) &&
                        (!to || isNaN(new Date(to).getTime()) || logDate <= toDate)
                    ) {
                        logs.push(logObject);
                    }
                });

                rl.on("close", () => {
                    allLogs = allLogs.concat(logs);
                    resolve();
                });

                rl.on("error", (err) => {
                    reject(err);
                });
            });
        };

        await Promise.all(
            logFiles
                .filter((logFileName) => logFileName.startsWith(start) && logFileName.endsWith(".log"))
                .map(processLogFile)
        );

        return res.status(200).json({ logs: allLogs });
    } catch (error) {
        console.error("Error processing log files:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
