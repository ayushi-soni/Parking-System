const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const path = require ("path");

const app = express();
const hbs = require('hbs')

//const body1 = require('body-parser');
//app.use(body1.json());
console.log(__dirname);

//console.log(path.join(__dirname,"../public"));

const staticpath = path.join(__dirname,"../public");
app.set("view engine","hbs");
app.use(express.static(staticpath));
//const userRouter = require("./api/users/user.router");
//app.use("/api/users",userRouter);

//app.use(express.json());
app.get("/login",(req,res) =>
{
res.render("index");
});


app.get("/", (req,res) =>
{
    
});

app.listen(process.env.APP_PORT, () =>
{
    console.log(`listening port no ${process.env.APP_PORT}`);
});