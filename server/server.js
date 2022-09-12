const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const connection = require("./Database/connection");
const port = process.env.port;
const userRoute = require("./routers/user");
const postRoute = require("./routers/post");
//express inbuilt middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//middlewares

app.use("/api/users",userRoute);
app.use("/api/post",postRoute);

app.listen(port,()=>{console.log("you are now connected to server")});