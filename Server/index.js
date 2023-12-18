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
import adsBoarTypedRoute from './routes/ads_board_type.route.js';
dotenv.config();

const app = express();
const corsOptions = {
    origin: "http://localhost:" + process.env.PORT,
};
db();
const initializeExpress = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

initializeExpress(app);



app.use(locationRoute);
app.use(wardRoute);
app.use(districtRoute);
app.use(adsBoardRoute);
app.use(adstypeRoute);
app.use(locationTypeRoute);
app.use(adsBoarTypedRoute);



app.use(reportRoute);
app.use(editRequestRoute);
app.use(authorizeRequestRoute);
app.use('/', (req, res) => {
    res.send('API from Backend hihi :) ');
});
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port: " + process.env.PORT);
    console.log("http://localhost:" + process.env.PORT);
});
