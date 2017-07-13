const pgclient = require('./pgclient');

const jsforce = require('jsforce');

getAccountList = (accessToken='',instanceUrl='') => {
    return new Promise(function (resolve, reject) {
        var conn = new jsforce.Connection({
            instanceUrl :instanceUrl,
            accessToken :accessToken
        });

        conn.query("SELECT Id, Name, BillingAddress, Phone, Industry FROM Account LIMIT 20")
            .then(response => {
                return resolve(response);

            }, function (err) {
                return reject(err);
            });
    })
}

// Call Org using saved instance and access tokens
getCurrentConnection = (instanceUrl, accessToken) => {
    return new Promise(function (resolve, reject) {
        const conn = new jsforce.Connection({
            instanceUrl,
            accessToken
        });
    });
}

// Create new connection that requires either username, password + secret token OR oauth2 connection
getConnection = (username = '', password = '') => {

    return new Promise(function (resolve, reject) {
        var conn = new jsforce.Connection({
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

        conn.login(username, password, function(err, userInfo) {

            if (err) {
                console.error(err);
                return reject(err);
            }
            return resolve(conn);
         });
            
    });
}

getContacts = (conn) => {
    return new Promise(function (resolve, reject) {
        conn.sobject("Contact")
            .find(
                {'Account.Id' : '0016A000005ZLO5QAO' },
                { 
                    Id: 1,
                    Name: 1,
                    CreatedDate: 1 
                }
            )
            .execute((err, records) => {
                if (err) { return console.error(err); }
                return resolve(records);
            });
    });
}




authUserSfdc = (username = '', password = '') => {

    return new Promise(function (resolve, reject) {

        var conn = new jsforce.Connection({
            // loginUrl: process.env.SFDC_LOGIN_URL
            oauth2 : {
                // you can change loginUrl to connect to sandbox or prerelease env.
                loginUrl : 'https://login.salesforce.com',
                clientId : process.env.CLIENT_ID,
                clientSecret : process.env.SECRET,
                redirectUri : process.env.CALLBACK_URL
            }
        });

        conn.login(username, password, function(err, userInfo) {

            if (err) {
                return reject(userInfo);
            }

            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            userInfo.accessToken = conn.accessToken;
            userInfo.instanceUrl = conn.instanceUrl;

            return resolve(userInfo);

        });

    })
}


module.exports = {
    getCurrentConnection,
    getConnection,
    getAccountList,
    authUserSfdc,
    getContacts
}

