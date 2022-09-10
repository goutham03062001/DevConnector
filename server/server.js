const express = require("express");

const app = express();

const port = process.env.port || 4000;

//express inbuilt middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//middlewares

app.use("/api/users",require("./routers/user"));

//default route
app.get("/",(req,res)=>{res.send("hello from node js")})

app.listen(port,()=>{console.log("you are now connected to port 4000")});