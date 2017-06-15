const winston = require('winston');

module.exports = {
  createError,
  errorResponse
};

function createError(status, statusCode, message) {
  let error = new Error(message);
  error.status = status;
  error.statusCode = statusCode;
  return error;
}

/**
 * The standard error handler for all routes in this API
 * @param res
 * @returns {function(*=)}
 */
function errorResponse(res) {
  return error => {
    winston.debug(error);
    res.status(error.statusCode || 500)
      .json(error);
  };
}