const httpConstants = require('http2').constants;

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode;
  console.log(err.stack || err);
  const { message } = err;
  if (status === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR) {
    res.status(status).send({ message: 'Server Error' });
  } else {
    res.status(status).send({
      message,
    });
  }
  next();
};

module.exports = errorHandler;
