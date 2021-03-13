const Rooms = require('../models/roomModel')

//get all rooms
module.exports.get_all_rooms = (req,res)=>{
    Rooms.find()
    .then(rooms => res.json(rooms))
    .catch(err=> res.status(400).json({
        err,
        message:"Error getting groups"
    }))
}

//create new room
module.exports.create_room = (req,res)=>{
    const roomname = req.body.name;
    Rooms.findOne({"name":roomname}, (err,room)=>{
        if(err) res.status(401).json({
            err,
            message:"Error finding the room"
        })
        if(room !== null){
            res.json("Room already exists")
        }
        else{
            const newRoom = new Rooms({
                name:roomname
            })
            newRoom.save()
            .then(room => res.json({
                room,
                message:"New room created"
            }))
            .catch(err=>{res.json({
                err,
                message:"Error creating the group"
            })})
        }
    })
}


//New message in a chat
module.exports.new_message_to_room = (req,res)=>{
    const {sender,reciever,content} = req.body
    const roomid = req.params.id
    Rooms.findById(roomid)
    .then(room=> res.json(room))
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding room"
    }))
}