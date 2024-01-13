import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import http from "http";
import logger from "./utils/logger.js";
import { errorHandler, notFound } from "./helper/errorHandler.js";
import db from "./configs/db.js";
import redisClient, { set, get } from "./configs/redis.js";
import locationRoute from "./routes/location.route.js";
import locationTypeRoute from "./routes/locationtype.route.js";
import wardRoute from "./routes/ward.route.js";
import districtRoute from "./routes/district.route.js";
import adstypeRoute from "./routes/ads_type.route.js";
import reportRoute from "./routes/report.route.js";
import editRequestRoute from "./routes/editRequest.route.js";
import authorizeRequestRoute from "./routes/authorizeRequest.route.js";
import adsBoardRoute from "./routes/ads_board.route.js";
import adsBoarTypedRoute from "./routes/ads_board_type.route.js";
import companyRoute from "./routes/company_route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import reportType from "./routes/report_type.route.js";
import notificationRoute from "./routes/notification.route.js";
import logRoute from "./routes/log.route.js";
import { sendEmail } from "./utils/sendEmail.js";
import SocketListener from "./socket/socket.js";
import { Server } from "socket.io";
import path from "path";
import { specs, swaggerUi } from "./configs/swagger.js";
//import YAML from "yamljs";

//const swaggerDocument = YAML.load("./app.yaml");
const __dirname = path.resolve();
dotenv.config();

const app = express();
const corsOptions = {
  origin: "14.225.192.121",
};
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả nguồn, hoặc chỉ định nguồn cụ thể
    methods: ["GET", "POST"],
  },
});
global.userList = {};

global.io = io; //added

db();
redisClient.ping((err, reply) => {
  if (err) {
    console.error("Error connecting to Redis:", err);
  } else {
    console.log("Connected to Redis:", reply);
  }
});
// const testRedisOperations = async () => {
//   try {
//     // Thực hiện set giá trị

//     const result = await redisClient.get('thien');
//     console.log('Result from Redis:', result);
//   } catch (error) {
//     console.error('Error during Redis operations:', error);
//   } finally {
//     // Đóng kết nối sau khi thực hiện xong
//     redisClient.disconnect();
//   }
// };

// // Gọi hàm thực hiện các thao tác Redis
// testRedisOperations();
const initializeExpress = (app) => {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("combined", { stream: logger.stream }));
};

initializeExpress(app);
SocketListener.start(io);
app.use(notificationRoute);
app.use(reportType);
app.use(locationRoute);
app.use(wardRoute);
app.use(districtRoute);
app.use(adsBoardRoute);
app.use(adstypeRoute);
app.use(locationTypeRoute);
app.use(adsBoarTypedRoute);
app.use(companyRoute);
app.use(userRoute);
app.use(reportRoute);
app.use(editRequestRoute);
app.use(logRoute);
app.use(authorizeRequestRoute);
app.use(authRoute);
/// handle socket
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(notFound);
app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log("Server is running on ports: " + process.env.PORT);
  console.log("http://localhost:" + process.env.PORT);
});
