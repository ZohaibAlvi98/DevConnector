
const PostModel = require('./post.model')



exports.create = async (req,res)=>{
    try{
        
        req.body['name'] = req.user.name
        req.body['avatar'] = req.user.avatar
        req.body['user'] = req.user._id
        
        await PostModel.create(req.body, async(err,post)=>{
            console.log(post)
            res.send({
                success: true,
                post: post
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}

exports.fetchAllPosts = async(req,res)=>{
    try{
        let posts = await PostModel.find({}).sort({date: -1})
        console.log(posts)
    res.send({
        success: true,
        posts: posts
    })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}

exports.fetchPostsById = async(req,res)=>{
    try{
        await PostModel.findById(req.params.postId, async(err,post)=>{
        if(!post){
            res.send({
                success: false,
                message: 'No post found'
            })
        }else{
            res.send({
                success: true,
                post: post
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

exports.deletePost = async(req,res)=>{
    try{
        await PostModel.findById(req.params.postId, async(err,post)=>{
            console.log(post)
            console.log(req.user)
        if(post.user.toString() != req.user._id){
            res.send({
                success: false,
                message: 'User not Authorized'
            })

        }else{
            await post.remove()
            console.log('herre')
            res.send({
                success: true,
                message: 'Post had been deleted'
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

exports.postLikes = async(req,res)=>{
    try{
        await PostModel.findById(req.params.postId, async(err,post)=>{
        if(!post){
            res.send({
                success: false,
                message: 'Post not found'
            })
        }
        else if(post.likes.filter(likes => likes.user.toString() == req.user._id ).length > 0){
            res.send({
                success: false,
                message: 'Post already been liked'
            })
        }else{
            post.likes.unshift({user: req.user._id})

            await post.save();
            res.send({
                success: true,
                likes: post.likes
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

exports.postUnlike = async(req,res)=>{
   try{
        await PostModel.findById(req.params.postId, async(err,post)=>{
        if(!post){
            res.send({
                success: false,
                message: 'Post not found'
            })
        }
        else if(post.likes.filter(likes => likes.user.toString() == req.user._id ).length == 0){
            res.send({
                success: false,
                message: 'Post has not been liked'
            })
        }else{
           const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user._id)
           post.likes.splice(removeIndex, 1)

            await post.save();
            res.send({
                success: true,
                likes: post.likes
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

exports.createComment = async(req,res)=>{
    try{
        req.body['user'] = req.user._id
        req.body['name'] = req.user.name
        req.body['avatar'] = req.user.avatar
    await PostModel.findById(req.params.postId, async(err,post)=>{
        post.comments.unshift(req.body)
       await post.save()
       res.send({
           success: true,
           post: post
       })
    })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
      }
}

exports.deleteComment = async(req,res)=>{
    try{

      
        await PostModel.findById(req.params.postId, async(err,post)=>{
            const comment = post.comments.find(comment => comment._id.toString() == req.params.commentId)
            if(!comment){
                res.send({
                    success: false,
                    message: 'Comment not found'
                })
            }else if(comment.user._id.toString() != req.user._id){
                res.send({
                    success: false,
                    message: 'User Not found'
                })
            }else{
                const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId)
                post.comments.splice(removeIndex, 1)
                await post.save();
                res.send({
                    success: true,
                    post: post
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
