const mongoose = require('mongoose')
const schema = mongoose.Schema

const ConversationModel = new schema({
    participants: [
        {
            name:{
                type:String,
                required:true
            }
        }
    ],
    messages:[
        {
            sender_name:{
                type:String,
                required:true
            },
            reciever_name:{
                type:String,
                required:true
            },
            content:{
                type:String,
                required:true,
                max:255
            }
        }
    ]
},{
    timestamps:true
})

const Conversations = mongoose.model("Conversations", ConversationModel)
module.exports = Conversations