const User = require('../models/usermodel');
const {userLoginValidation,userRegisterValidation} = require('../validation/validationSchema')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')

module.exports.get_all = (req,res)=>{
    User.find({}, (err,users)=>{
        err ? res.json(err) : res.json(users)
    })
}

//User registration
module.exports.add_new_user = async (req,res)=>{
    //Request data validation
    const {error} = userRegisterValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

   //Check if username/Email already exists
   const emailExist = await User.findOne({email: req.body.emailid})
   const userNameExists = await User.findOne({username: req.body.username})

   if(emailExist){
    return res.status(400).send("Email already Exists")
    }
    if(userNameExists){
    return res.status(400).send("Username already Exists")
    }

     //Hash password before storing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const firstname = req.body.firstname;
   const lastname = req.body.lastname;
   const emailid = req.body.emailid;
   const username = req.body.username;
   const chatId = req.body.chatId;
   const dob = Date.parse(req.body.dob)
   const newUser = new User({
       firstname,
       lastname,
       emailid,
       username,
       password: hashedPassword,
       chatId,
       dob
   }); 
   newUser.save()
   .then(()=> res.json("User Added to database"))
   .catch((err)=>{res.status(400).json("Error: "+ err)})
}


//User Login
module.exports.user_login = async (req,res)=>{ 
   try{
         //Request Data Validation
        const {error} = userLoginValidation(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }
        //Check if the username exists
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(400).send("Incorrect Username Entered...")
        }
        //Check valid password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid Password...');
    
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send({ token , userid:  user._id , username : user.username })

   }catch(err) {
       console.log(err)
   }

}
//Following route
module.exports.following_follower = (req,res)=>{
    const username = req.body.username;
    const newFollowing = {username}
    User.findById(req.params.id)
    .then(user=>{
        const user_found = user.following.filter(u => u.username === username)
        if(user_found.length === 0) {
            User.findOne({"username":username}, (err,targetUser)=>{
                if(err) res.status(400).json({error: err})
                if(targetUser === null) res.json("No user found")

                else {
                    user.following.push(newFollowing)
                    const newFollower = {username: user.username}
                    targetUser.followers.push(newFollower);
                    user.save().catch(err=> res.status(400).json("Error adding user to following..",err))
                    targetUser.save().catch(err=> res.status(400).json({error: err, message:"Error adding user to followers"}))
                    res.json("User added to followers and following")
                }
                
            })
        }
        else {
            res.json(`You are already following ${username}`)
        }
    })
    .catch(err=>{res.status(400).json("Error: "+err)})
}

//Get user by username
module.exports.search_by_username = (req,res)=>{
    const username = req.body.username;
    User.findOne({"username":username}, (err,user)=>{
        if(err) return res.json(err)
        if(!user) return res.json({error: "No user found"})
        
        else return res.json(user)
    })
}

//Get User by id 
module.exports._search_by_id = (req,res)=>{
    User.findById(req.params.id)
    .then(user=> res.send(user))
    .catch(err=> res.json(err))
}



//Delete all users
module.exports.nuke = (req,res)=>{
    User.deleteMany({})
    .then(res.json("Nuke Deployed"))
    .catch(err=>res.status(400).json("Error deploying the nuke...", err))
}






// User.findOne({"following.username":username},"following.$", (err,result)=>{
//     if(err) err=>res.json(err)
//     if(result === null){
//         //Add user to current user following list
//         user.following.push(newFollower)
//         user.save()
//         //res.json(`Started following ${username}`)

//         //Add user to the target user followers list
//         User.findOne({"username":username})
//         .then(targetUser=> {
//             targetUser.followers.push(newFollower)
//             targetUser.save()
//             .then(res.json("Added user to followers and following"))
//             .catch(err=> res.status(400).json("Error adding user to followers list ",err))
//         })
//         .catch(err=> res.status(400).json("Error locating user..",err))

//     }else{
//     user.following.id(result.following[0]._id).remove()
//     user.save().catch(err=> res.status(400).json("Error removing follower: ", err))
//     User.findOne({"username":username}, (err,user)=>{
//         if(err) res.status(400).json(err)
//         User.findOne({"followers.username":user.username}, "followers.$", (err,result)=>{
//             if(err) res.status(400).json(err)
//             user.followers.id(result.followers[0]._id).remove()
//             user.save()
//             .then("User removed from followers and following")
//             .catch(err=> res.status(400).json("Error removing user from followers and following..", err))
//         })
//     })
    
//     }
// })


