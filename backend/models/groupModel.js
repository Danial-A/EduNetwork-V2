const mongoose = require('mongoose')
const schema = mongoose.Schema

const groupModel = new schema({
    title:{
        type:String,
        required:true,
        min:6
    },
    admins:[
        {
            userId:{
                type:String,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ],
    posts: [
        {
            postID:{
                type:String,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ],

    groupMembers:[
        {
            userId:{
                type:String,
                required:true,
                unique:true,
                sparse:true,

            }
        }
    ]
})

const Groups = mongoose.model('Groups',groupModel)
module.exports = Groups