/* eslint-disable no-unused-vars,no-param-reassign */
const pgClient = require('./pgclient');

const jsforce = require('jsforce');
const Promise = require('bluebird');


const getAccountList = (accessToken = '', instanceUrl = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
    instanceUrl,
    accessToken
  });

  conn.query('SELECT Id, Name, BillingAddress, Phone, Industry FROM Account LIMIT 20')
            .then(response => resolve(response), err => reject(err));
});


const getAccountListWithMapping = (accessToken = '', instanceUrl = '', param = []) => pgClient.getMapping(param).then((rows) => {
  const fields = [];
  rows.forEach((field) => {
    fields.push(field.mapping);
  });

  return new Promise((resolve, reject) => {
    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken
    });

    conn.query(`SELECT ${fields.join(',')} FROM Account LIMIT 20`)
                .then(response => resolve(response), err => reject(err));
  });
})
        .catch((error) => {
          console.error(error);
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
      console.error(err);
      return reject(err);
    }
    return resolve(conn);
  });
});

const getContacts = conn => new Promise((resolve) => {
  conn.sobject('Contact')
            .find(
                { 'Account.Id': '0016A000005ZLO5QAO' },
    {
      Id: 1,
      Name: 1,
      CreatedDate: 1
    }
            )
            .execute((err, records) => {
              if (err) {
                return console.error(err);
              }
              return resolve(records);
            });
});


const authUserSfdc = (username = '', password = '') => new Promise((resolve, reject) => {
  const conn = new jsforce.Connection({
            // loginUrl: process.env.SFDC_LOGIN_URL
    oauth2: {
                // you can change loginUrl to connect to sandbox or prerelease env.
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

            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
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
  getAccountListWithMapping
};

