
const logger = require("../config/logger.config");
const BaseError = require("../errors/base.error");
const { StatusCodes } = require('http-status-codes');


// error-handling middleware so syntex "(err, req, res, next)" [ https://expressjs.com/en/guide/error-handling ]

function errorHandler(err, req, res, next) {

    // IF error is child object of BaseError
    if(err instanceof BaseError) {

        logger.error(err.message);

        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data: {} // because this is an exception so no data is going to be provided
        });
    }

    // ELSE
    
    logger.error("Something went wrong !");
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong !',
        error: err,
        data: {}
    });
}

module.exports = errorHandler;