const PrivateChat = require('../models/privateChatModel')

//get all chats
module.exports.get_all_chats = (req,res)=>{
    PrivateChat.find()
    .then(chats => res.json(chats))
    .catch(err=> res.status(400).json({
        message:"Error finiding chats",
        err
    }))
}

//Create new Private Chat
module.exports.create_new_chat = (req,res)=>{
    const participants = {
        firstUserID: req.body.firstUser,
        secondUserID:req.body.secondUser
    }
    const chat = new PrivateChat ({
        participants
    })
    chat.save()
    .then(chat=> res.json({
        chat,
        message:"new chat created"
    })).catch(err=> res.status(400).json({
        err,
        message:"Error creating chat"
    }))
}