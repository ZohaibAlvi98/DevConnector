'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-user', controller.create)


router.get('/', controller.getAllUsers)

router.post('/login', controller.login)


module.exports = router