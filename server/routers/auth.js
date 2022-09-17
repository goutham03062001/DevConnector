const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/Userschema");
router.get("/",auth, async (req,res)=>{
    
    try {
        
        let user = await User.findById(req.user.id).select('-password');
        return res.json({user});
    } catch (error) {
        console.log("error : ",error.message);
    }
});

module.exports = router;