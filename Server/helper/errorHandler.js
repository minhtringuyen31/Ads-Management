import createError from 'http-errors';

const notFound = (req, res, next) => {
    next(createError.NotFound('This route does not exist'));

};

const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).send({ message: error.message, status: error.status || 500 });
};

export { errorHandler, notFound };
