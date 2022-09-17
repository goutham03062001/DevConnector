const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/Userschema");
const jwt = require("jsonwebtoken");
// const auth = require("../middlewares/auth");
router.post("/", async (req,res)=>{

    const {email,password} = req.body;

    const checkExisted = await User.findOne({email});
    if(checkExisted)
    {
        if(bcryptjs.compare(checkExisted.password,password)){

                //return your jwt token

                const payload = {
                    user :{
                        id: checkExisted.id
                    }
                }

                jwt.sign(payload,process.env.JWT_Secret,{expiresIn:36000},(err,token)=>{
                    if(err) throw err;
                    return res.json({token});
                })
            

            
        }
        else{
            return res.send('your credentials were wrong');
        }
    }
    else{
        return res.send("you are not registered");
    }

});
module.exports = router;
