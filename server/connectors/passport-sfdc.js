const passport = require('passport');
const ForceDotComStrategy = require('passport-forcedotcom').Strategy;
require('dotenv').config();
//----------------------------------------------------------------------------
// REPLACE THE BELOW SETTING TO MATCH YOUR SALESFORCE CONNECTED-APP'S SETTINGS
//----------------------------------------------------------------------------

// Set Force.com app's clientID
// const CF_CLIENT_ID = '3MVG9ZL0ppGP5UrC80AgNht24mMAjVhKNz_9ZNk1e7RbnQD3XHeVD7FWBwshwXinEYUGozdKTH2CcxvH0MjaI';
const CF_CLIENT_ID = process.env.CLIENT_ID;

// Set Force.com app's clientSecret
// const CF_CLIENT_SECRET = '8328306587854636993';
const CF_CLIENT_SECRET = process.env.SECRET;
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
const CF_CALLBACK_URL = `${process.env.WEB_ROOT}/auth/forcedotcom/callback`;

// Salesforce Authorization URL (this defaults to:
// https://login.salesforce.com/services/oauth2/authorize)
const SF_AUTHORIZE_URL = 'https://login.salesforce.com/services/oauth2/authorize';

// Salesforce token URL (this defaults to:
// https://login.salesforce.com/services/oauth2/token)
const SF_TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const sfStrategy = new ForceDotComStrategy({
  clientID: CF_CLIENT_ID,
  clientSecret: CF_CLIENT_SECRET,
  callbackURL: CF_CALLBACK_URL,
  authorizationURL: SF_AUTHORIZE_URL,
  tokenURL: SF_TOKEN_URL
}, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
  const profiles = profile;
  process.nextTick(() => {
       // console.log(accessToken);

        // To keep the example simple, the user's forcedotcom profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the forcedotcom account with a user record in your database,
        // and return that user instead.
        //
        // We'll remove the raw profile data here to save space in the session store:
    delete profiles._raw;

    console.log(JSON.stringify(profiles));

    return done(null, accessToken, profiles);
  });
});

passport.use(sfStrategy);
