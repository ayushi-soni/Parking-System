const {login,checkin,checkout,invoice,history,available,nonavailable} = require("./user.controller");
const {checkToken} = require("../../auth/token_validation");
//const bodyparser = require('body-parser');
//app.use(bodyparser.json());

const router = require("express").Router();

router.post("/login",login);
router.post("/checkin",checkin);
router.post("/checkout",checkout);
router.get("/checkauthorization",checkToken,(req,res) =>
{
res.send("user is authorized");
});
router.post("/invoice",invoice);
router.post("/histor",history);

router.get("/available",available);
router.get("/nonavailable",nonavailable);
// router.get("/ParkingSystemHome",checkToken,(req,res)=>
// {
//     res.render("ParkingSystemHome");
// })
// router.get("/logout",checkToken,(req,res) =>
// {
    

//      console.log(req.user);
//     res.clearCookie("jwt");
//     console.log("logout successfulluy");
//       //await req.user.save();
//       //res.sendFile(_dirname +'/views/ParkingSystemHome.ejs');
//       res.render("ParkingSystemHome");
//      //res.sendfile(__dirname + '/static/login.html');
//     // }catch(error){
//     // res.status(500).send(error);
//     // }

// });


module.exports=router;
