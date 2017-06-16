// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// Setup logger
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Redirect all routes back to index.html, as this is simply serves up a SPA
app.get('/[^\.]+$', function(req, res){
  res.set('Content-Type', 'text/html')
    .sendFile(__dirname + '/build/index.html');
});


module.exports = app;
