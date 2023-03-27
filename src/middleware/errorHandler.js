const errorHandler = (err, req, res, next) => {
    let errCode, errMessage;

    if (err.code) {
        errCode = err.code;
        errMessage = err.message;
    } else {
        errCode = 500;
        errMessage = "Internal Server Error";
    }
    console.log(errCode, errMessage);
    res.status(errCode).send(errMessage);
};

module.exports = errorHandler;
