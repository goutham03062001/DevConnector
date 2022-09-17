const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Userschema");

const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
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

            // return res.status(200).json({
            //     newUser
            // })
            //return json web token

            const payload = {
                user:{
                    id: newUser.id
                }
            }

            jwt.sign(payload,process.env.JWT_Secret,{expiresIn:36000},(err,token)=>{
                if(err) throw err;
                res.json({token });
            });
            
            
        } catch (error) {
            console.log("error : ",error.message);
        }
    }
}

module.exports = RegisterComponent;