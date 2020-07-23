'use strict';

var express = require('express');
var controller = require('./post.controller')
// var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-post', controller.create)

module.exports = router