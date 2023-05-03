const httpConstants = require('http2').constants;

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  console.log(err.stack || err);

  res.status(status).send({
    err,
  });
  next();
};

module.exports = errorHandler;
