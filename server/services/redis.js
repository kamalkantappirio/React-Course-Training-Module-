const Promise = require('bluebird');
const redis = require('redis');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

module.exports = {
  userSessions: redis.createClient({url: process.env.REDIS_URL + '/' + process.env.REDIS_USER_SESSIONS_DB})
};
