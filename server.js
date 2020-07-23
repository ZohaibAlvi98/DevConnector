'use strict';
const dotenv = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');

const app = express();


const PORT = process.env.PORT;

global.ROOTPATH = __dirname;

// app.use(express.json({extended: false}))
// app.use('/auth', require('./auth'))

app.locals.moment = require('moment');

app.get('/dist-user-images/:filename', function(req, res) {
  var filename = req.params.filename.replace(/'/g, '');
  res.sendFile(path.resolve('./dist/App/assets/images/user/' + filename));
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

require('./config')(app);
require('./route')(app);

app.listen(PORT, function() {
  console.log('Server listening on PORT : ' + PORT);
})