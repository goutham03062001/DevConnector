const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const connection = require("./Database/connection");
const port = process.env.port;
const userRoute = require("./routers/user");
const loginRoute = require("./controllers/loginRoute");
const postRoute = require("./routers/post");
const authRoute = require("./routers/auth");
const profileRoute = require("./routers/profile");

//admin files
const adminRoute = require("./Admin/AdminController");
const createUser = require("./Admin/CreateUser");
//express inbuilt middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//myown jwt middleware
const auth = require("./middlewares/auth");
//middlewares

app.use("/api/users",userRoute);
app.use("/api/post",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/profile",profileRoute);
app.use("/api/users/login",loginRoute);

//admin panel routes
app.use("/api/admin",adminRoute);
app.use("/api/admin/createUser",createUser);

app.listen(port,()=>{console.log("you are now connected to server")});