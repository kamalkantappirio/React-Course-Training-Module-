const path = require('path');
const fs = require('fs');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const SAMLStrategy = require('passport-saml').Strategy;
const bodyParser = require('body-parser');
const errorResponse = require('../services/error').errorResponse;
const knexService = require('../services/knex');
const jwtService = require('../services/jwt');
const userSessions = require('../services/redis').userSessions;
const signatureService = require('../services/signature');

module.exports = {
  connectToPassport
};

function connectToPassport(app) {
  app.use(session({ secret: process.env.STOREWALK_SECRET || 'in_development_mode'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cors());

  app.get('/auth/error', (req, res) => {
    return res.status(401).json({message: 'NOPE'});
  });

  app.post('/auth/callback',
    passport.authenticate('saml', { failureRedirect: '/auth/error', failureFlash: true}),
    (req, res) => {
      let jwt = jwtService.sign(req.user);
      userSessions
        .setAsync(jwt, 'true')
        .then(() => {
          // Pass the JWT to the webclient for processing
          return res.redirect(`${process.env.WEB_CLIENT_ROOT}?token=${jwt}`);
        })
        .catch(errorResponse(res));
    });

  app.get('/auth/login',
    passport.authenticate('saml', { failureRedirect: '/auth/error', failureFlash: true}),
    (req, res) => {
      return res.redirect('/');
    });

  app.get('/auth/signature', (req, res) => {
    let authorization = req.headers['authorization'];
    if (!authorization) {
      return res.status(401).json({error: 'Unauthorized access detected'});
    }

    let profile = {};
    let token = authorization.replace('Bearer ', '');
    jwtService.verify(token)
      .then(decoded => {
        return knexService.select()
          .from('public.user')
          .where('email', '=', decoded.email)
      })
      .then(results => {
        if (results.length === 1) {
          profile.firstName = results[0].firstname;
          profile.lastName = results[0].lastname;
          profile.uid = results[0].sfid;
          return signatureService.getSaltSignature(results[0].email);
        }

        return false;
      })
      .then(saltAndSignature => {
        if (saltAndSignature) {
          profile = Object.assign(saltAndSignature, profile);
          return res.json(profile);
        }
        return res.status(401).json({error: 'Unauthorized access detected'});
      })
      .catch(errorResponse(res));
  });

  return app;
}

function verify(profile, done) {
  // TODO: Modify this shape when we actually integrate with Ping IdP, the assumption is we will have the email of the authenticated user and perhaps their sfid
  let email =  profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  return done(null, {email});
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const samlIssuer = process.env.SAML_ISSUER || 'urn:app68638885.auth0.com';
const samlIDPCert = process.env.SAML_SIGNING_CERT || fs.readFileSync(path.join(__dirname, '../../auth0_saml.pem'), 'utf-8');
const samlCallbackURL = process.env.SAML_CALLBACK_URL || 'http://localhost:3001/auth/callback';
const samlEntryPoint = process.env.SAML_ENTRY_POINT || 'https://app68638885.auth0.com/samlp/ThnjLTAKUI2hrjxMmXfJmgylR3HKBFRH';

const samlConfig = {
  callbackUrl: samlCallbackURL,
  entryPoint: samlEntryPoint,
  issuer: samlIssuer,
  cert: samlIDPCert
};

passport.use(new SAMLStrategy(samlConfig, verify));