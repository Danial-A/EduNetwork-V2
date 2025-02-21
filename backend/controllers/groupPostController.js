const mongoose = require('mongoose')
const Group = require('../models/groupModel')
const Post = require('../models/postModel')
const Users = require('../models/usermodel')
const {postValidationSchema} = require('../validation/validationSchema')
const {groupValidationSchema}  = require('../validation/validationSchema')
//Create new group
module.exports.create_group =async (req,res)=>{
    const userid = mongoose.Types.ObjectId(req.params.user)
    const {error} = await groupValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    
    const title = req.body.title
    const description = req.body.description
    const newGroup = new Group({
        title,description
    })
    newGroup.save()
    .then((group)=> {
        group.admins.push({userid})
        group.save()
        .then(response=>{
            Users.findById(userid, "groups", (err,user)=>{
                if(err) return res.status(400).json({
                    err,
                    message:"Error finding user"
                })
                else if(user === null) return res.json("No user exists")
                else{
                    user.groups.push({groupid:response._id})
                    user.save()
                    .then(res.json("New group created, user added as admin, group added to user groups list"))
                    .catch(err=> res.status(400).json({
                        err,
                        message:"Error adding group to user list"
                    }))
                }
            })
        }).catch(err=> res.status(400).json({
            err,
            message:"error creating the group"
        }))
    })
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

    const newPost =await new Post({
                title: req.body.title,
                body:req.body.body,
                author: req.body.author,
                postType:req.body.postType
            })
            newPost.save()
            .then((response)=>{
                Group.findById(req.params.id, (err,group)=>{
                    if (err) res.status(400).send({
                        err,
                        message:"Error finding the group"
                    })
                    else {
                        group.posts.push({postid:response._id})
                        group.save()
                        .then(()=>{
                            res.json("New post added to group")
                        })
                        .catch(err=> res.status(400).send({
                            err,
                            message:"Error adding post to the group"
                        }))
                    }
                })
            }).catch(err=> res.status(400).send({
                err,
                message:"Error creating the post"
            }))

}

//Get all posts in group
module.exports.get_group_posts = (req,res)=>{
    Group.findById(req.params.id, async (err,result)=>{
        if(err) res.status(400).json({
            message:"Error retrieving the group",
            error:err
        })
        else{
            const PostIDs = await result.posts.map(post => post.postid)
            Post.find({
                '_id':{
                    $in:PostIDs
                }
            }).then(response=>{
                res.json(response)
            }).catch(err=>{
                res.status(400).json({
                    error:err,
                    message:"Error finding the posts for this group"
                })
            })
        }
    })
    
    .catch(err=> res.status(400).json({error:err, message: "error finding the group"}))
}

//get all users from admin ids
module.exports.get_all_users_from_admin_id = (req,res)=>{
    Group.findById(req.params.id,(err,group)=>{
        if(err) res.status(400).json({
            message:"Error retrieving the admins",
            error:err
        })
        else if (group === null) res.json("Group does not exist")
        else{
            res.json(group)
        }
    })
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
    const userid = req.body.userid
    Group.findById(req.params.id, (err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Error retrieving the group"
        })
        else{
            const user_found = group.groupMembers.filter(u=> u.userid === userid)
            if(user_found.length > 0) res.json({
                message:"User is already a member",
                userid
            })
            else {
                group.groupMembers.push({userid})
                group.save()
                .then(res.json("New member adder to the group"))
                .catch(err=> res.status(400).json({
                    error:err,
                    message:"Error adding new member"
                }))
            }
        }
    })
}

//remove members
module.exports.remove_member = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id)
    .then(group=>{
        const member = group.groupMembers.filter(m=> m.userid === userid)
        if(member.length === 0){
            res.json("No user found in group members list")
        }else{
            group.groupMembers.id(member[0]._id).remove()
            group.save()
            res.json("Member removed successfully")
        }
    }).catch(err => res.status(400).json({error:err, message:"Error finding the gorup"}))
}

//Find group by id
module.exports.find_by_id = (req,res)=>{
    Group.findById(req.params.id, (err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Unable to locate the group"
        })
        else res.json({
            group,
            message:"Group found"
        })
    })
}

//Nuke groups
module.exports.nuke = (req,res)=>{
    Group.deleteMany({})
    .then(res.json("Nuke deployed.."))
    .catch(err=> res.status(400).json({
        err,
        message:"Error deploying nuke"
    }))
}