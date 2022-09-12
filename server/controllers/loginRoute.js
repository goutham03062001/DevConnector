const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/Userschema");
const loginRouter = async (req,res)=>{

    const {email,password} = req.body;

    const checkExisted = await User.findOne({email});
    if(checkExisted)
    {
        if(bcryptjs.compare(checkExisted.password,password)){
            return res.status(202).json({
                message:"you are now logged in",
                success : {
                    data : checkExisted
                }
            })
        }
    }
    else{
        return res.send("you are not registered");
    }

}
module.exports = loginRouter;