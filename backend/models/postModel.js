const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    title:{
        type:String,
        required:[true, "Post title is required"],
        min:12
    },
    body:{
        type:String,
        required:[true,"Post body is required"],
        min:80
    },
    author: {
        type:String,
        required:true,
        trim:true
    },
    comments:[
        {
        username:{
            type:String,
            required:true,
            trim:true
        },
        body:{
            type:String,
            required:[true, "Comment body is required..."],
        }
    },
    {
        timestamps:true
    }
],
    likes:[{
        username:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            sparse:true
        }
    }],
    postType:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

const Posts = mongoose.model('Posts', postModel);
module.exports= Posts

