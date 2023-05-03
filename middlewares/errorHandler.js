// const httpConstants = require('http2').constants;

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode;
  console.log(err.stack || err);
  const { message } = err;

  res.status(status).send({
    err,
    message,
  });
  next();
};

module.exports = errorHandler;
