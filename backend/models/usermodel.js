const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    emailid:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },
    username:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        min:6
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6
    },
    dob:{
        type: Date,
        required:true
    },
    chatId:{
        required:true,
        type:String
        // unique:true
    }
    ,followers:[
        {
            userid:{
                type:String,
                trim:true,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ],
    following:[
        {
            userid:{
                type:String,
                trim:true,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ]
    ,groups:[
        {
            groupid:{
                type:String,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ]

},{
    timestamps:true
})
const Users = mongoose.model("users", userSchema)

module.exports = Users;