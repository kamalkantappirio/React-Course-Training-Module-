// server/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const session = require('express-session');
const api = require('./routes');
const account = require('./sfdc');

require('newrelic');
require('dotenv').config();
const pgClient = require('./sfdc/pgclient')

const WEB_ROOT=`${process.env.WEB_ROOT}`;

const passport = require('passport'),
    util = require('util'),
    ForceDotComStrategy = require('passport-forcedotcom').Strategy;

//----------------------------------------------------------------------------
// REPLACE THE BELOW SETTING TO MATCH YOUR SALESFORCE CONNECTED-APP'S SETTINGS
//----------------------------------------------------------------------------

// Set Force.com app's clientID
const CF_CLIENT_ID = '3MVG9ZL0ppGP5UrC80AgNht24mMAjVhKNz_9ZNk1e7RbnQD3XHeVD7FWBwshwXinEYUGozdKTH2CcxvH0MjaI';

// Set Force.com app's clientSecret
const CF_CLIENT_SECRET = '8328306587854636993';

// Note: You should have a app.get(..) for this callback to receive callback
// from Force.com
//
// For example, if your callback url is:
//
//   https://localhost:3000/auth/forcedotcom/callback
//
// then, you should have a HTTP GET endpoint like:
//
//   app.get('/auth/forcedotcom/callback, callback))
//
const CF_CALLBACK_URL = 'http://localhost:3001/auth/forcedotcom/callback';


// Salesforce Authorization URL (this defaults to:
// https://login.salesforce.com/services/oauth2/authorize)
const SF_AUTHORIZE_URL = 'https://login.salesforce.com/services/oauth2/authorize';

// Salesforce token URL (this defaults to:
// https://login.salesforce.com/services/oauth2/token)
const SF_TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token';

app.use(passport.initialize());
app.use(passport.session());
app.set('trust proxy', 'loopback')

app.use(session({ secret: 'keyboard cat'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use('/api', api);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the ForceDotComStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Salesforce
//   profile), and invoke a callback with a user object.
const sfStrategy = new ForceDotComStrategy({
    clientID: CF_CLIENT_ID,
    clientSecret: CF_CLIENT_SECRET,
    callbackURL: CF_CALLBACK_URL,
    authorizationURL: SF_AUTHORIZE_URL,
    tokenURL: SF_TOKEN_URL
}, function(accessToken, refreshToken, profile, done) {

    // asynchronous verification, for effect...
    process.nextTick(function() {

       // console.log(accessToken);

        // To keep the example simple, the user's forcedotcom profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the forcedotcom account with a user record in your database,
        // and return that user instead.
        //
        // We'll remove the raw profile data here to save space in the session store:
        delete profile._raw;

        return done(null,accessToken);
    });
});


/*const sfStrategy = new CustomStrategy({
    clientID: CF_CLIENT_ID,
    clientSecret: CF_CLIENT_SECRET,
    callbackURL: CF_CALLBACK_URL,
    authorizationURL: SF_AUTHORIZE_URL,
    tokenURL: SF_TOKEN_URL
}, function(accessToken, refreshToken, profile, done) {

    // asynchronous verification, for effect...
    process.nextTick(function() {

        // console.log(accessToken);

        // To keep the example simple, the user's forcedotcom profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the forcedotcom account with a user record in your database,
        // and return that user instead.
        //
        // We'll remove the raw profile data here to save space in the session store:
        delete profile._raw;

        return done(null,accessToken);
    });
});*/


passport.use(sfStrategy);
app.post('/account', function(req, res){

  const accessToken = req.body.accessToken;
  const instanceUrl = req.body.instanceUrl;


  console.log(instanceUrl);
  const aDetail = account.getAccountList(accessToken, instanceUrl);

  aDetail.then(response => {
    console.log(response);
    return  res.status(200).json(response)
  })
  .catch(error => {
      console.log(error);
      return error;
  });
});

app.get('/login',function(req, res) {

    return passport.authenticate('forcedotcom')(req,res);
});


app.get('/mapping',function(req, res) {
    const aMapping = pgClient.getFieldsMapping();

    aMapping.then(function(rows) {
        return res.json(rows);
    })
        .catch(function(error) {
            console.error(error)
            return error;
        });

});


app.post('/mapping',function(req, res) {



    console.log(req.body);
    const aMapping = pgClient.updateMapping(req.body);
    aMapping.then(response => {

     return  res.status(200).json('success')
     })
     .catch(error => {
     console.log(error);
     return error;
     });
});


app.post('/login', function(req, res){

    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    const aDetail = account.authUserSfdc(username, password);

    aDetail.then(response => {
        console.log(response);
        return  res.status(200).json(response)
    })
        .catch(error => {
            console.log(error);
            return error;
        });
})

// GET /auth/forcedotcom
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Force.com authentication will involve
//   redirecting the user to your domain.  After authorization, Force.com will
//   redirect the user back to this application at /auth/forcedotcom/callback
app.get('/auth/forcedotcom', passport.authenticate('forcedotcom'), function(req, res) {
    // The request will be redirected to Force.com for authentication, so this
    // function will not be called.
});

// GET /auth/forcedotcom/callback
//   PS: This MUST match what you gave as 'callback_url' earlier
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/forcedotcom/callback', passport.authenticate('forcedotcom', {
    failureRedirect: WEB_ROOT+'/'
}), function(req, res) {
    res.redirect(WEB_ROOT+'/?access_token='+res.req.user.params.access_token+'&instance_url='+res.req.user.params.instance_url);
});

app.get('/logout', function(req, res) {
    res.redirect('/');
});

//app.listen(3001);
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Redirect all routes back to index.html, as this is simply serves up a SPA
app.get('/[^\.]+$', function(req, res){
  res.set('Content-Type', 'text/html')
    .sendFile(__dirname + '/build/index.html');
});


module.exports = app;
