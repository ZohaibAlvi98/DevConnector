
const PostModel = require('./post.model')



exports.create = async (req,res)=>{
    try{
        
        req.body['name'] = req.user.name
        req.body['avatar'] = req.user.avatar
        req.body['user'] = req.user._id
        
        await PostModel.create(req.body, async(err,post)=>{
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
    const posts = await PostModel.find({}).sort({date: -1})
    res.send({
        success: true,
        posts: posts
    })
}

exports.fetchPostsById = async(req,res)=>{
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
}

exports.deletePost = async(req,res)=>{
    await PostModel.findById(req.params.postId, async(err,post)=>{
        if(post.user.toString() != req.user._id){
            res.send({
                success: false,
                message: 'User not Authorized'
            })

        }else{
            await post.remove()
            res.send({
                success: true,
                message: 'Post had been deleted'
            })
        }
    })
}

exports.postLikes = async(req,res)=>{
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
}

exports.postUnlike = async(req,res)=>{
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
}
