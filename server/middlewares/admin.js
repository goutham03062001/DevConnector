const express = require("express");
const router = express.Router();

module.exports = function(req,res,next){

    var{email,password,token,otp} = req.body;

    if(email=='goutham@gmail.com' && password=='!@#$%^!2adminA' 
        && token=="jsonwebtoken" && otp=='A@#$BCd')
    {
       req.email = email;
        // res.send("your now an admin and can perform any actions");

        
    }
    else{

        console.log("your credentials were wrong");
        
    }

    next();

    
}