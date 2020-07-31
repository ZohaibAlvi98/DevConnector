'use strict';

var express = require('express');
var controller = require('./post.controller')
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-post', auth.isAuthenticated() ,controller.create)

router.get('/fetch-all-posts', controller.fetchAllPosts)

router.get('/fetch-post-by-id/:postId',controller.fetchPostsById)

router.post('/delete-post/:postId', auth.isAuthenticated(), controller.deletePost)

module.exports = router