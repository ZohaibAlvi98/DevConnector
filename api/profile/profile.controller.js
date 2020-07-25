
const ProfileModel = require('./profile.model')




exports.getUserProfile = async (req,res)=>{
  try{
    await ProfileModel.findById(req.user._id, async(err,UserProfile)=>{
        console.log(UserProfile)
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
            console.log(req.body.skills)
        }
        await ProfileModel.findOne({user:req.user._id}, async(err,preProfile)=>{
            console.log('here')
            if(preProfile){
                await ProfileModel.findByIdAndUpdate(preProfile._id,req.body, async(err,updProfile)=>{
                    console.log(updProfile)
                    res.send({
                        success: true,
                        profile: updProfile
                    })
                })
            }else{
                await ProfileModel.create(req.body, async(err,createdProfile)=>{
                    if(err){
                        res.send({
                            success: false,
                            message: e.message
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
        await ProfileModel.findOne({user: req.params.userId}, async(err,fetchProfile)=>{
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