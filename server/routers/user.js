const express = require("express");

const router = express.Router();

//   @url   /api/user

//   @type //get route

// router.get("/",(req,res)=>{
//     res.send("User router");
// })


//post register route

router.post("/register",(req,res)=>{
      
    const{username,useremail,userpassword} = req.body;
    console.log(username,useremail,userpassword);

    let userName = username;

    if(userName.length<10){
        res.send(`your name is too short : ${userName.length}`)
    }
})

module.exports = router;
