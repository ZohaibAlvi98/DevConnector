'use strict';

var express = require('express');
var controller = require('./profile.controller')
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/get-user-profile', auth.isAuthenticated() ,controller.getUserProfile)

router.post('/create-profile', auth.isAuthenticated(), controller.create)

router.get('/fetch-all-profile', controller.fetchAllProfile)

router.get('/fetch-user/:id',controller.fetchUserById)

router.get('/fetch-a-userProfile/:id',auth.isAuthenticated(), controller.fetchAUserProfile)

router.post('/delete-profile', auth.isAuthenticated(), controller.deleteProfile)

router.post("/add-profile-experience", auth.isAuthenticated(), controller.addProfileExperience)

router.post("/delete-profile-experience/:expId", auth.isAuthenticated(), controller.deleteProfileExperience)

router.post('/add-profile-education', auth.isAuthenticated(), controller.addProfileEducation)

router.post("/delete-profile-education/:eduId", auth.isAuthenticated(), controller.deleteProfileEducation)

router.get('/get-github-repos', controller.getGithubRepos)

module.exports = router