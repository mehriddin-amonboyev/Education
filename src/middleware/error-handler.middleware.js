import logger from "../utils/logger.utils.js";

const sendDublicateFieldException = (err) => {
    const error = { ...err };

    if (error.code != 11000) {
        return error;
    }

    error.name = "Validation Error";
    error.message = `Given value ${Object.values(error.keyValue).join(" ")} for ${Object.keys(error.keyValue).join(" ")} is already axists.Try another one!`;
    error.statusCode = 400;
    error.isException = true;

    return error;
};

export const ErrorHandlerMiddleware = (err, _, res, __) => {
    err = sendDublicateFieldException(err);

    if (err.isException) {
        logger.error(`Exception(${err.name}): message: ${err.message}, status:${err.statusCode}, Time${new Date()}`);

        return res.status(err.statusCode).send({
            name: err.name,
            message: err.message,
        });
    }

    res.status(500).send({
        message: "Internal Server Error",
    });
};