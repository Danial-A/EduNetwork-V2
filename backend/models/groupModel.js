const mongoose = require('mongoose')
const schema = mongoose.Schema

const groupModel = new schema({
    title:{
        type:String,
        required:true,
        min:6
    },
    description:{
        type:String,
        required:true,
        min:20
    },
    admins:[
        {
            userid:{
                type:String,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ],
    posts: [
        {
            postid:{
                type:String,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ],

    groupMembers:[
        {
            userid:{
                type:String,
                required:true,
                unique:true,
                sparse:true,
            }
        }
    ]
},{
    timestamps :true,
    autoIndex:false
})

const Group = mongoose.model('Groups',groupModel)
module.exports = Group