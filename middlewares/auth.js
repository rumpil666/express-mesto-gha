const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const handleAuthError = () => {
  throw new UnauthorizedError('Необходима авторизация');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization || !autorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(autorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
