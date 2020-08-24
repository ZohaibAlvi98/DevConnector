'use strict';

const path = require('path');
// const fs = require('fs');

const _ = require('lodash');
const moment = require('moment');

const UserSessionModel = require('./userSession.model');
const UserModel = require('../user/user.model');

// const SpotifyUser = require('../../auth/spotify/spotify.model')
exports.verify = async function(req, res) {
  req.query.token = req.header('Authorization')
  console.log(req.header('Authorization'))
  console.log('here')
  if (req.query.token != undefined) {
    try {
      
      UserSessionModel.findById(req.query.token, async (err, sessions) => {
        if (err) {
          //console.log("err", err);
        }
        //console.log('Session found', sessions);
        console.log(sessions)
        if (sessions != undefined) {
          if (!sessions.isDeleted) {
            //console.log(sessions.userId);
            await UserModel.findById( sessions.userId.toString()
            , (err, user) => {
              console.log(user)
              if(user.length !=0 ){
              console.log(user)
                  res.send({
                    success: true,
                    user: user[0]
                  });
                
            }
        })
    }
}
      })
    }catch (e) {
        res.send({
          success: false,
          messaage: "undefined"
        })
      }
}
}
