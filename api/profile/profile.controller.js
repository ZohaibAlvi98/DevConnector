
const ProfileModel = require('./profile.model')
const UserModel = require('../user/user.model')
const PostModel = require('../post/post.model')
const request = require('request')


exports.getUserProfile = async (req,res)=>{
  try{
      console.log(req.user._id)
    await ProfileModel.findById(req.user._id, async(err,UserProfile)=>{
        console.log(UserProfile)
        console.log('er')
        if(!UserProfile){
            res.send({
                success: false,
                message: 'No user profile found..'
            })
        }
        else{
            res.send({
                success: true,
                UserProfile: UserProfile
            })
        }
        
    })
  }catch(e){
      res.send({
          success: false,
          message: e.message
      })
  }
}

exports.create = async(req,res)=>{
    try{
        req.body['user'] = req.user._id
        // console.log(req.body)
        if(req.body.skills){
            req.body.skills = req.body.skills.split(',').map(skill => skill.trim())
           
        }
        let social = {
            twitter: req.body.twitter,
             facebook: req.body.facebook,
             instagram: req.body.instagram,
             linkedin: req.body.linkedin,
             youtube: req.body.youtube
         }
         req.body.social = social
        await ProfileModel.findOne({user:req.user._id}, async(err,preProfile)=>{
           
            if(preProfile){
                await ProfileModel.findByIdAndUpdate(preProfile._id,req.body, async(err,updProfile)=>{
                    
                    res.send({
                        success: true,
                        profile: updProfile
                    })
                })
            }else{
                   
                    if(req.body.twitter != '' || req.body.facebook != '' || req.body .instagram != '' || req.body.youtube != ''
                    || req.body.linkedin != ''){
                        req.body.social = ''
                        let social = {
                           twitter: req.body.twitter,
                            facebook: req.body.facebook,
                            instagram: req.body.instagram,
                            linkedin: req.body.linkedin,
                            youtube: req.body.youtube
                        }
                      req.body.social = social
                    }
                    
                await ProfileModel.create(req.body, async(err,createdProfile)=>{
                   
                    if(err){
                        res.send({
                            success: false,
                            message: err.message
                        })  
                    }else{
                        res.send({
                            success: true,
                            profile: createdProfile
                        })
        
                    }
               
            })
            }
        })
        
  }catch(e){
    res.send({
        success: false,
        message: e.message
    })
  }
}

exports.fetchAllProfile = async(req,res) =>{
    try{
        await ProfileModel.find({},async (err,allProfile)=>{
            res.send({
                success: true,
                profile: allProfile
            })
        })
    }catch(e){
    res.send({
        success: false,
        message: e.message
    })
  }
}

exports.fetchAUserProfile = async(req,res)=>{
    try{
        await ProfileModel.findOne({user: req.params.id}, async(err,fetchProfile)=>{
            if(!fetchProfile){
                res.send({
                    success: false,
                    message: 'No User profile found'
                })
            }else{
                res.send({
                    success: true,
                    profile: fetchProfile
                })
            }
            
        })
    }catch(e){
    res.send({
        success: false,
        message: e.message
    })
  }
}

exports.deleteProfile = async(req,res)=>{
   try{ 
       await PostModel.remove({user: req.user._id})
       await ProfileModel.findOneAndDelete({user: req.user._id})

    await UserModel.findByIdAndDelete(req.user._id)
    res.send({
        success: true,
        message: "successfully deleted"
    })
   }catch(e){
    res.send({
        success: false,
        message: e.message
    })
  }
}

exports.addProfileExperience = async(req,res)=>{
    try{
        await ProfileModel.findOne({user: req.user._id},async(err,profile)=>{
            profile.experience.unshift(req.body)
            console.log(profile)
            await profile.save()
            res.send({
                success: true,
                profile: profile
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}

exports.deleteProfileExperience = async(req,res)=>{
    try{
            await ProfileModel.findOne({user: req.user._id}, async(err,profile)=>{
                const removeIndex = profile.experience.map(async experience => experience._id).indexOf(req.params.expId)
                profile.experience.splice(removeIndex, 1)    
                await profile.save()       
                res.send({
                    success: true,
                    profile: profile
                })
            })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}


exports.addProfileEducation = async(req,res)=>{
    try{
        await ProfileModel.findOne({user: req.user._id},async(err,profile)=>{
            profile.education.unshift(req.body)
            console.log(profile)
            await profile.save()
            res.send({
                success: true,
                profile: profile
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}


exports.deleteProfileEducation = async(req,res)=>{
    try{
        console.log('here')
            await ProfileModel.findOne({user: req.user._id}, async(err,profile)=>{
                const removeIndex = profile.education.map(async education => education._id).indexOf(req.params.eduId)
                profile.education.splice(removeIndex, 1)    
                await profile.save()       
                res.send({
                    success: true,
                    profile: profile
                })
            })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}

exports.getGithubRepos = async(req,res)=>{
    try{
       
        const options = {
            uri: `https://api.github.com/users/${req.query.key}/repos?per_page=5&sort=created: asc&client_id=${process.env.Client_id}&client_secret=${process.env.Client_secret}`,
            method: 'GET',
            headers:{
                'user-agent': 'nodejs'
            }
        }
        request(options,(error,response,body)=>{
           
            if(error){
                console.error(error)
            }else if(response.statusCode != 200){
                res.send({
                    success: false,
                    message: "No github profile found"
                })
            }else{
                res.send({
                    success: true,
                    repos: JSON.parse(body)
                })
            }

             

        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}