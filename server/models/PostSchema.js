const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
    name : {
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },

    Comments:{
        selfComments:[],

        othersComments:[]
    },

    likes:{
        type:Number
    },

    dislikes:{
        type:Number
    }

});

module.exports = post = mongoose.model("posts",PostSchema);