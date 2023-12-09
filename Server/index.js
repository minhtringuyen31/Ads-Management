import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFound } from './helper/errorHandler.js';
import db from './configs/db.js';
import locationRoute from './routes/location.route.js';
import locationTypeRoute from './routes/locationtype.route.js';
import wardRoute from './routes/ward.route.js';
import districtRoute from './routes/district.route.js';
import adstypeRoute from './routes/ads_type.route.js';
import reportRoute from './routes/report.route.js';
import editRequestRoute from './routes/editRequest.route.js';
import authorizeRequestRoute from './routes/authorizeRequest.route.js';
import adsBoardRoute from './routes/ads_board.route.js';
import adsBoardTypeRoute from './routes/ads_board_type.route.js';
dotenv.config();

const app = express();
const corsOptions = {
    origin: "http://localhost:" + process.env.PORT,
};
db();
const initializeExpress = (app) => {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

initializeExpress(app);

// Tạo một router riêng cho tất cả các API
const apiRouter = express.Router();

apiRouter.use('/location', locationRoute);
apiRouter.use('/ward', wardRoute);
apiRouter.use('/district', districtRoute);
apiRouter.use('/adsBoard', adsBoardRoute);
apiRouter.use('/adstype', adstypeRoute);
apiRouter.use('/locationType', locationTypeRoute);
apiRouter.use('/adsBoardType', adsBoardTypeRoute);
apiRouter.use('/report', reportRoute);
apiRouter.use('/editRequest', editRequestRoute);
apiRouter.use('/authorizeRequest', authorizeRequestRoute);

// Gắn tiền tố "/api" cho router API
app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port: " + process.env.PORT);
    console.log("http://localhost:" + process.env.PORT);
});
