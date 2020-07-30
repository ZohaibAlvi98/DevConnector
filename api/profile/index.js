'use strict';

var express = require('express');
var controller = require('./profile.controller')
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/get-user-profile', auth.isAuthenticated() ,controller.getUserProfile)

router.post('/create-profile', auth.isAuthenticated(), controller.create)

router.get('/fetch-all-profile', controller.fetchAllProfile)

router.get('/fetch-a-userProfile',auth.isAuthenticated(), controller.fetchAUserProfile)

router.post('/delete-profile', auth.isAuthenticated(), controller.deleteProfile)


module.exports = router