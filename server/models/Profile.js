const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"myuser",
    },

    company:{
        type : String,
    },

    website:{
        type: String
    },

    location:{
        type: String
    },

    status:{
        type: String,
        require:true
    },

    skills:{
        type: [String],
        require:true
    },

    bio:{
        type:String
    },
    githubusername:{
        type:String
    },

    experience:[
        {
            title:{type: String},
            company:{type: String,},
            location:{type: String,},
            from:{type:Date},
            to:{type:Date},
            current:{type: Boolean,default : false},
            description:{type:String}

        }
    ],

    education:[
        {
            degree:{type:String,},
            fieldOfStudy:{type:String,},
            from:{type:Date},
            to:{type:Date},
            current:{type: Boolean, default:false},
            description:{type:String}
        }
    ],

    social:{
        youtube:{type:String},
        twitter:{type:String},
        facebook:{type:String},
        linkedin:{type:String},
        instagram:{type:String}
    },

    date:{
        type: Date,
        default : Date.now
    }

});


module.exports = Profile = mongoose.model("profile",ProfileSchema);