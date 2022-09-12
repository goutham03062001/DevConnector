const express = require("express");

const router = express.Router();

const User = require("../models/Userschema");
const RegisterComponent = require("../controllers/userRoutes");
const loginRouter = require("../controllers/loginRoute");
//post register route

router.post("/register", RegisterComponent);
router.post("/login",loginRouter);
module.exports = router;
