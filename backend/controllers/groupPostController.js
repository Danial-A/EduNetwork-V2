const mongoose = require('mongoose')
const Groups = require('../models/groupModel')
const Group = require('../models/groupModel')
const Post = require('../models/postModel')
const {postValidationSchema} = require('../validation/validationSchema')
//Create new group
module.exports.create_group = (req,res)=>{
    const title = req.body.title
    const newGroup = new Group({
        title
    })
    newGroup.save()
    .then(()=> res.json("New Group created"))
    .catch(err=> res.status(400).json({error: err, message:"Error creating the group"}))
}

//Get All groups
module.exports.get_all_groups = (req,res)=>{
    Group.find()
    .then(groups => res.json(groups))
    .catch(err=> res.status(400).json("Error getting groups ", err))
}

//New group post
module.exports.create_group_post = async (req,res)=>{
    //Request data validation
    const {error} = await postValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    //Adding post to the group
    Group.findById(req.params.id)
    .then(group=>{
        const newPost = new Post({
            title: req.body.title,
            body:req.body.body,
            author: req.body.author,
            postType:req.body.postType
        })
        newPost.save()
        .catch(err=> res.status(400).json("Error creating post ",err))
        const postID = newPost._id
        const newGroupPost = {postID}
        group.posts.push(newGroupPost)
        group.save()
        .then(res.json("New post added to the group"))
        .catch(err=> res.status(400).json({error:err, messasge:"Error adding post to the group"}))
        
    })
    .catch(err=> res.status(400).json({error:err, message:"Error finding the group"}))

}

//Get all posts in group
module.exports.get_group_posts = (req,res)=>{
    Group.findById(req.params.id)
    .then(group=> {
        posts = group.posts.map(p => mongoose.Types.ObjectId(p.postID))
        Post.find({
            '_id': {
                $in: posts
            }
        }).sort({createdAt:-1})
        .then(result=>{
            res.json(result)
        }).catch(err=> res.status(400).json({error:err, message:"Error finding the posts"}))
    })
    .catch(err=> res.status(400).json({error:err, message: "error finding the group"}))
}

//Add admins
module.exports.add_admins = (req,res)=>{
    const newAdmin = {
        userid: req.body.userid
    };
    Group.findById(req.params.id)
    .then(group=>{
        group.admins.push(newAdmin)
        group.save()
        res.json("admin added")
    }).catch(err=> res.status(400).json({error:err,message:"Error finding the post"}))
}

// Remove admin
module.exports.remove_admin = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id)
    .then(group=>{
        const admin = group.admins.filter(m=> m.userid === userid)
        if(admin.length === 0){
            res.json("No user found in group admins list")
        }else{
            group.admins.id(admin[0]._id).remove()
            group.save()
            res.json("admin removed successfully")
        }
    }).catch(err => res.status(400).json({error:err, message:"Error finding the gorup"}))
}

//Add members
module.exports.add_members = (req,res)=>{
    const newMember = {
        userid: req.body.userid
    };
    Group.findById(req.params.id)
    .then(group=>{
        group.members.push(newMember)
        group.save()
        res.json("Member added")
    }).catch(err=> res.status(400).json({error:err,message:"Error finding the group"}))
}

//remove members
module.exports.remove_member = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id)
    .then(group=>{
        const member = group.members.filter(m=> m.userid === userid)
        if(member.length === 0){
            res.json("No user found in group members list")
        }else{
            group.members.id(member[0]._id).remove()
            group.save()
            res.json("Member removed successfully")
        }
    }).catch(err => res.status(400).json({error:err, message:"Error finding the gorup"}))
}