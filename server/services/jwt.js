const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const STATUS = require('./constants').STATUS;
const errorHandlers = require('./error');

module.exports = {
  sign,
  verify
};

/**
 * Synchronously signs an object as a JWT
 * @param payload
 * @returns {*}
 */
function sign(payload) {
  return jwt.sign(payload, process.env.STOREWALK_SECRET);
}

/**
 * Asynchronously verifies a JWT. Note that this is asynchronous as .verify usually happens as part
 * of a Promise chain, whereas .sign happens synchronously in-line
 * @param token
 */
function verify(token) {
  return new Promise(
    (resolve, reject) => {
      jwt.verify(token, process.env.STOREWALK_SECRET, (err, decoded) => {
        if (err || !decoded) {
          let error = errorHandlers.createError(STATUS.ERROR, 401, `Unauthorized access detected - ${token}`);
          return reject(error);
        }
        return resolve(decoded);
      });
    }
  );
}