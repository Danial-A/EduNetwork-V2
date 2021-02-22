const Post = require('../models/postModel');
const {postValidationSchema} = require('../validation/validationSchema')
//Retrieve all posts 
module.exports.get_all = (req,res)=>{
    Post.find().sort({createdAt :-1}).exec((err,posts)=>{
        err ? res.json(err) : res.json(posts)
    })
}

//Delete all posts
module.exports.nuke = (req,res)=>{
    Post.deleteMany({})
    .then(res.json("Nuke Deployed"))
    .catch(err=>res.status(400).json("Error deploying the nuke...", err))
}

//Add new post
module.exports.add_post =async (req,res)=>{
    //Req data validation
    const {error} =await postValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const newPost = new Post({
        title: req.body.title,
        body:req.body.body,
        author: req.body.author,
        postType:req.body.postType
    })
    newPost.save()
    .then(res.json("New post added"))
    .catch(err=> res.status(400).json("Error creating post ",err))
}

//Like or Unlike post
module.exports.like_unlike = (req,res)=>{
    const username = req.body.username
    const newLike = {username}
    Post.findById(req.params.id)
    .then(post=>{
        const like_found = post.likes.filter(u=> u.username === username)
        if(like_found.length === 0){
            post.likes.push(newLike)
            post.save()
            res.json(`Post liked by ${username}`)
        }else{
            post.likes.id(like_found[0]._id).remove()
            post.save()
            res.json(`Post unliked by ${username}`)
        }
    })
    .catch(err=> res.status(400).json("Error Finding the post ",err))
}

//Add comments
module.exports.post_comment = (req,res)=>{
    const newComment = {
        username: req.body.username,
        body:req.body.body
    }
    Post.findById(req.params.id)
    .then(post=>{
        post.comments.push(newComment)
        post.save()
        res.json("New Comment added to post")
    }).catch(err=>res.status(400).json("Error adding comment to post.", err))
}

//Delete Comment
module.exports.delete_comment = (req,res)=>{
    Post.findById(req.params.id)
    .then(post=>{
        Post.findOne({"comments._id":req.body.commentID},"comments.$", (err,result)=>{
            if(err) res.status(400).json("Error finding user ",err)
            
            post.comments.id(result.comments[0]._id).remove()
            post.save()
            .then(res.json("Comment Deleted"))
            .catch(err=> {res.status(400).json("Error deleting the comment..", err)})
        })
    })
    .catch(err=> res.status(400).json("error finding the post.",err))
}

//Update comment
module.exports.update_comment = (req,res, next)=>{
    
    Post.findById(req.params.id)
    .then(post=>{
        
        var comment = post.comments.id(req.body.id)
        comment.set(req.body)
        return post.save()
       
    })
    .then(post=> res.send(post))
    .catch(err=> res.status(404).json("Error finding the post ",err))
}

//Get posts for a specific user
module.exports.user_posts = (req,res)=>{
    Post.find({"author":req.body.author}).sort({createdAt:-1}).exec((err,posts)=>{
        if(err)  res.status(400).json({error:err, message:"Error locating the posts"})
        else res.json(posts)
    })
}