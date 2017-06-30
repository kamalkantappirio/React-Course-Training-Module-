// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const account = require('./sfdc')
require('newrelic');
require('dotenv').config();

app.set('trust proxy', 'loopback')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.get('/account', function(req, res){

  const username = req.query.username;
  const password = req.query.password;

  const aDetail = account.getAccountList(username, password);

  aDetail.then(response => {
    console.log(response);
    return  res.status(200).json(response)
  })
  .catch(error => {
      console.log(error);
      return error;
  });
});


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Redirect all routes back to index.html, as this is simply serves up a SPA
app.get('/[^\.]+$', function(req, res){
  res.set('Content-Type', 'text/html')
    .sendFile(__dirname + '/build/index.html');
});


module.exports = app;
