const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const path = require ("path");
const app = express();
const axios = require("axios");
app.set("view engine","ejs");
const cookieParser = require('cookie-parser');
const body1 = require('body-parser');
app.use(body1.urlencoded({ extended: false }));
app.use(body1.json());
app.use(cookieParser());

//console.log(__dirname);
//const staticpath = path.join(__dirname,"../public");
//app.set("view engine","hbs");
//app.use(express.static(staticpath));
app.use(express.static(path.join(__dirname,"public")));
//app.use('/public/images/',express.static('./public/images'));
//console.log(path.join(__dirname,"../public"));
//const staticpath = path.join(__dirname,"../public");
const userRouter = require("./api/users/user.router");
const a = require('axios');
app.use("/api/users",userRouter);

app.use(express.json());

// app.get("/",(req,res)=>
// {
//   res.sendFile(__dirname + "/ParkingSystemHome.html")
// }
app.get("/api",(req,res) =>
{
  //  res.sendFile(__dirname + '/static/index.html');
    res.json({
        success : 1,
        message: "this is rest api working"
    });
});

app.get("/",(req,res)=>
{
res.render("ParkingSystemHome");
});
app.get("/ParkingSystemHome",(req,res)=>
{
res.render("ParkingSystemHome");
});
app.get("/ParkingSystemContactUs",(req,res)=>
{
  res.render("ParkingSystemContactUs")
});
app.get("/ParkingSystemLogin",(req,res)=>
{
  res.render("ParkingSystemLogin");
});
app.get("/ParkingSystemAboutUs",(req,res)=>
{
res.render("ParkingSystemAboutUs");
});
app.get("/ParkingSystemOurVision",(req,res) =>
{
  res.render("ParkingSystemOurVision")
});
app.get("/api/users/ParkingSystemHome",(req,res)=>
{
    res.render("ParkingSystemHome");
});
app.get("/api/users/ParkingSystemOurVision",(req,res) =>
{
  res.render("ParkingSystemOurVision")
});
app.get("/api/users/ParkingSystemContactUs",(req,res) =>
{
  res.render("ParkingSystemContactUs")
});
app.get("/api/users/ParkingSystemAboutUs",(req,res) =>
{
  res.render("ParkingSystemAboutUs")
});
app.get("/api/users/ParkingSystemLogin",(req,res) =>
{
  res.render("ParkingSystemLogin")
});
app.get("/api/users/history",(req,res) =>
{
  res.render("history")
});
app.get("/api/users/home2",(req,res) =>
{


  axios.get('https://arcane-beyond-69154.herokuapp.com/api/users/available').then(resp =>{
    ans= resp.data;
    console.log(ans.data)  
    
            res.render("home2",{result:ans.data,result1:""})
  //  console.log(ans);
});
});



// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/static/login.html');
//   });
//   app.get('/home', (req, res) => {
//     res.sendFile(__dirname + '/static/home.html');
//   });


  // app.post('/login', (req, res) => {
  //   // Insert Login Code Here
  //   let username = req.body.username;
  //   let password = req.body.password;
  //   res.send(`Username: ${username} Password: ${password}`);
  //   //res.sendFile(home2)
  // });
  app.get('/logout',(req,res) =>
  {
    res.clearCookie("jwt");
    res.render("ParkingSystemHome");
  });
  

  app.listen(process.env.PORT, () =>
{
    console.log(`listening port no ${process.env.APP_PORT}`);
});


// app.get("/available", async (req, res) => {
//  // const username = req.query.username || "myogeshchavan97";
//   try {
//     const result = await axios.get(
//      // `https://api.github.com/users/${username}/repos`
//      `http://localhost:2000/api/users/available`
//     );
//     const repos = result.data.map((repo) => ({
//       slotno: repo.slotno,
//       floor: repo.floor,
//      // description: repo.description,
//     }));
//     console.log(repos);
//     console.log(result);
//     res.render("home2", {
//       repos
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Error while getting list of repositories");
//   }
// });

// axios.get('http://localhost:2000/api/users/available').then(res =>{
//  result= res.data;
//  console.log(result);
 

//})
