const mongoose = require("mongoose");
const config = require("config");
const dbUrl = process.env.mongoDbUrl;
mongoose.connect(dbUrl,{useNewUrlParser:false})

.then((success)=>{console.log("connected to database")})
.catch((error)=>{console.log("error",error)});
