const express = require("express");
const router = express.Router();
const User = require("../models/Userschema");
const adminAuth = require("../middlewares/admin");
const adminController = require("../Admin/AdminController");
router.get("/",(req,res)=>{
    res.send("your now in admin panel");
});

router.post("/allDetails",adminAuth,adminController);

module.exports = router;