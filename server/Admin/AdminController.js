const express = require("express");
const User = require("../models/Userschema");
module.exports = async(req,res)=>{

    try {
        const details = await User.find();
        return res.status(200).json({
            message : "Your website users",
            response : `your email id : ${req.email}`,
            totalUsers : details.length,
            operations:["deny actions","remove users","insert user","alter user","assign user"],
            data : details
        });
    } catch (error) {
        console.log(error.message);
    }

};
