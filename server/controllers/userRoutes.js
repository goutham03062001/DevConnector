const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/Userschema");

const RegisterComponent =  async(req,res)=>{

    const{name,email,password} = req.body;

    const isExisted = await User.findOne({email});
    if(isExisted){
        return res.status(302).json({
            message:"this email is already existed"
        });
    }
    else{
        try {
            // const newUser = new User({name,email,password});
            newUser = new User({name,email,password});

            const salt = await bcryptjs.genSalt(10);
            
            newUser.password = await bcryptjs.hash(password,salt);
            
            await newUser.save();

            return res.status(201).json({
                message : "registered successfully",
                data : {
                    newUser
                }
            })
            
        } catch (error) {
            console.log("error : ",error.message);
        }
    }
}

module.exports = RegisterComponent;