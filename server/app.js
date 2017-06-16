// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = express.Router();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', (req, res) => {
  res.json([{"hello": "World"}]);
});


module.exports = app;
