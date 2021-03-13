const mongoose = require('mongoose')
const schema = mongoose.Schema

const PrivateChatSchema = new schema({
    participants:{
        firstUserID:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        secondUserID:{
            type:String,
            unique:true,
            required:true,
            trim:true
        }
    },
    messages:[{
        messageid:{
            type:String,
            unique:true
        }
    }]
},{
    timestamps:true
})

const PrivateChat = mongoose.model('PrivateChats', PrivateChatSchema)
module.exports = PrivateChat
