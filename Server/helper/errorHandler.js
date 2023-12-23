import createError from 'http-errors';
import logger from '../logs/logger.js';
const notFound = (req, res, next) => {
    next(createError.NotFound('This route does not exist'));

};

const errorHandler = (error, req, res, next) => {
    logger.error(error.stack); // Ghi log lỗi sử dụng Winston
    res.status(error.status || 500).send({ message: error.message, status: error.status || 500 });
};

export { errorHandler, notFound };
