const jsforce = require('jsforce');

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
        // use Contact object to 
        conn.sobject("Contact")
            .find(
                // DEV_ACCOUNT_1 and DEV_ACCOUNT_2 to test out different Accounts via environment variables
                {'Account.Id' : process.env.DEV_ACCOUNT_2 },
                // Return the following properties and values for these objects
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

module.exports = {
    getCurrentConnection,
    getConnection,
    getContacts
}

