const express = require("express");
const router = express.Router();
const User = require("../models/Userschema");
const adminAuth = require("../middlewares/admin");

//@req      POST api/admin/create
//@desc     creating a new user
//@access   Private
router.post("/create", async(req,res)=>{
    const{name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message : "Please fill all the fields"
        })
    }

    else{

        try {
            newUser = new User({name,email,password});
            await newUser.save();

            return res.json({message : "user created successfully",response:newUser});
        } catch (error) {
            
            res.status(500).send("Server Error");
        }
    }
});


//@req     DELETE api/admin/deleteUser/:id
//@desc    delete a particular user
//@access  private

router.delete("/deleteUser/:user_id", async(req,res)=>{

    const userId = req.params.id;

    try {
        const isFound = await User.findByIdAndDelete(userId);
        if(!isFound){return res.status(400).json({message:"user not found"})}
        else{
            return res.json({message:"user deleted successfully"});
        }
    } catch (error) {
        
    }
})
module.exports = router;