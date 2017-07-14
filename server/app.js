/* eslint-disable arrow-body-style */
import 'newrelic';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import api from './routes';
import account from './sfdc';
import pgClient from './sfdc/pgclient';
import './connectors/passport-sfdc';

require('dotenv').config();

const app = express();

const WEB_ROOT = process.env.WEB_ROOT;

app.use(passport.initialize());
app.use(passport.session());
app.set('trust proxy', 'loopback');

app.use(session({ secret: 'keyboard cat' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.post('/account', (req, res) => {
  const accessToken = req.body.accessToken;
  const instanceUrl = req.body.instanceUrl;
  const aDetail = account.getAccountList(accessToken, instanceUrl);

  aDetail.then((response) => {
    return res.status(200).json(response);
  })
  .catch((error) => {
    return error;
  });
});


app.get('/login', (req, res) => passport.authenticate('forcedotcom')(req, res));

app.get('/mapping', (req, res) => {
  const aMapping = pgClient.getFieldsMapping();

  aMapping.then((rows) => {
    return res.json(rows);
  })
  .catch((error) => {
    return error;
  });
});


app.post('/mapping', (req, res) => {
  const aMapping = pgClient.updateMapping(req.body);
  aMapping.then((response) => {
    return res.status(200).json(response);
  })
  .catch((error) => {
    return error;
  });
});


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const aDetail = account.authUserSfdc(username, password);

  aDetail.then((response) => {
    return res.status(200).json(response);
  })
  .catch((error) => { return error; });
});

// GET /auth/forcedotcom
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Force.com authentication will involve
//   redirecting the user to your domain.  After authorization, Force.com will
//   redirect the user back to this application at /auth/forcedotcom/callback
app.get('/auth/forcedotcom', passport.authenticate('forcedotcom'), () => {
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
  failureRedirect: `${WEB_ROOT}/`
}), (req, res) => {
  res.redirect(`${WEB_ROOT}/?access_token=${res.req.user.params.access_token}&instance_url=${res.req.user.params.instance_url}`);
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Redirect all routes back to index.html, as this is simply serves up a SPA
app.get('/[^.]+$', (req, res) => {
  res.set('Content-Type', 'text/html')
    .sendFile(`${__dirname}/build/index.html`);
});

module.exports = app;
