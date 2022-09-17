const mongoose = require("mongoose");
const {Schema}= mongoose;

const PostSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'myuser'
    },
    text:{type:String,required:true},
    name:{type:String,required:true},
    likes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'myuser'
            }
        }
    ],

    comments:[
        {
            user:{type:Schema.Types.ObjectId,ref:'myuser'},
            text:{type:String,required:true},
            date:{type:Date, default:Date.now}
        }
    ]
});

module.exports = Post = mongoose.model("post",PostSchema);