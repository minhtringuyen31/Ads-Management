import createError from 'http-errors';
import logger from '../utils/logger.js';
import moment from 'moment-timezone';
const notFound = (req, res, next) => {
    next(createError.NotFound('This route does not exist'));

};

const errorHandler = (error, req, res, next) => {



    const formattedTimestamp = moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY HH:mm:ss');
    console.log(formattedTimestamp)
    // Use the logger to format the log message
    logger.error({
        message: `${error.message}`,
    });


    res.status(error.status || 500).send({ message: error.message, status: error.status || 500 });
};

export { errorHandler, notFound };
