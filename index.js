require('dotenv').config()

const express = require('express');
const winston = require('winston');
const port = process.env.PORT || 3001;

const connectToPassport = require('./server/auth').connectToPassport;
const app = connectToPassport(express());
app.use(express.static('build'));

// Redirect all routes back to index.html, as this is simply serves up a SPA
app.get('/[^\.]+$', function(req, res){
  res.set('Content-Type', 'text/html')
    .sendFile(__dirname + '/build/index.html');
});

app.listen(port, () => {
  winston.info(`Web Client Asset Server started on port ${port}`);
});