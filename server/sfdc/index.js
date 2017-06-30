const jsforce = require('jsforce');

getAccountList = (username = '', password = '') => {

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
            if (err) { return console.error(err); }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);

            if (err) {
                return reject(err);
            }
            conn.query("SELECT Id, Name, BillingAddress, Phone, Industry FROM Account LIMIT 20")
                .then(response => {
                    return resolve(response);

                }, function (err) {
                    return reject(err);
                });

        });

    })
}

module.exports = {
    getAccountList
}

