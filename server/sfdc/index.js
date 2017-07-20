/* eslint-disable no-unused-vars,no-param-reassign */
const winston = require('winston');
const jsforce = require('jsforce');
const Promise = require('bluebird');
const pgClient = require('./pgclient');
const account = require('./accountwrapper');

const getAccountList = (accessToken = '', instanceUrl = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    instanceUrl,
    accessToken
  });

  conn.query('SELECT Id, Name, BillingAddress, Phone, Industry FROM Account LIMIT 20')
    .then(response => resolve(response), err => reject(err));
});

const getObjectDesc = (accessToken = '', instanceUrl = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    instanceUrl,
    accessToken
  });
  conn.sobject('Account').describe((err, meta) => {
    if (err) {
      return reject(err);
    }
    return resolve(meta);
  });
});

const getAccountListWithMapping = (accessToken = '', instanceUrl = '', param = []) => pgClient.getMapping(param).then((rows) => {
  const mapping = [];
  rows.forEach((field) => {
    mapping.push(`${field.mapping}`);
  });

  return new Promise((resolve, reject) => {
    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken
    });

    const uniqueArray = mapping.filter((item, pos) => mapping.indexOf(item) === pos);

    conn.query(`SELECT Id, ${uniqueArray.join(',')} FROM Account LIMIT 20`)
      .then((response) => {
        const accounts = [];

        if (response.records.length > 0) {
          response.records.map((acc) => {
            accounts.push(account(acc, rows));
            return '';
          });

          resolve(accounts);
        } else { resolve(''); }
      }, err => reject(err));
  });
})
  .catch((error) => {
    winston.error(error);
    return error;
  });


// Call Org using saved instance and access tokens
const getCurrentConnection = (instanceUrl, accessToken) => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    instanceUrl,
    accessToken
  });
});

// Create new connection that requires either username, password + secret token OR oauth2 connection
const getConnection = (username = '', password = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    loginUrl: process.env.SFDC_LOGIN_URL
            // TODO: Un-comment below to utilize oauth2 authentication
            // oauth2 : {
            //     // you can change loginUrl to connect to sandbox or prerelease env.
            //     loginUrl : 'https://login.salesforce.com',
            //     clientId : process.env.CLIENT_ID,
            //     clientSecret : process.env.SECRET,
            //     redirectUri : process.env.CALLBACK_URL
            // }
  });

  conn.login(username, password, (err, userInfo) => {
    if (err) {
      winston.error(err);
      return reject(err);
    }
    return resolve(conn);
  });
});

const getContacts = conn => new Promise((resolve) => {
  conn.sobject('Contact')
    .find({
      'Account.Id': '0016A000005ZLO5QAO'
    },
    {
      Id: 1,
      Name: 1,
      CreatedDate: 1
    })
    .execute((err, records) => {
      if (err) {
        return winston.error(err);
      }
      return resolve(records);
    });
});


const authUserSfdc = (username = '', password = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: 'https://login.salesforce.com',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET,
      redirectUri: process.env.CALLBACK_URL
    }
  });

  conn.login(username, password, (err, userInfo) => {
    if (err) {
      return reject(userInfo);
    }
    userInfo.accessToken = conn.accessToken;
    userInfo.instanceUrl = conn.instanceUrl;

    return resolve(userInfo);
  });
});

module.exports = {
  getCurrentConnection,
  getConnection,
  getAccountList,
  authUserSfdc,
  getContacts,
  getAccountListWithMapping,
  getObjectDesc
};

