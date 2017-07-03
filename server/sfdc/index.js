const jsforce = require('jsforce');

getAccountList = (accessToken='',instanceUrl='') => {

    return new Promise(function (resolve, reject) {
        var conn = new jsforce.Connection({
            instanceUrl :instanceUrl ,
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
    getAccountList,
    authUserSfdc
}

