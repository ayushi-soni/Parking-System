
const { sign} = require("jsonwebtoken");
const axios = require('axios');
const {getUserByUserEmail,create,create2,create3,create4,create5,create6} = require("./user.service");
var err_msg ='';
var ans;
module.exports = {

login: (req,res) => {   
const body = req.body;
console.log(body);
//console.log("result" +result);
getUserByUserEmail(body.email,(err,result) => {
    if(err)
    {
        err_msg="invalid email or password";
        console.log("Error:"+err);
        res.render("ParkingSystemLogin",{err_msg:err_msg})
}
if(result==null) {
    console.log("Error:");
    err_msg= "invalid email or password";
    res.render("ParkingSystemLogin", { err_msg: err_msg });

    // return res.json({
    //     success: 0,
    //     data: "undefined"
    // });  
 
 //res.render("home2",result);
 
 

    //console.log(result +"variable");
}
//const results = compareSync(body.password,result.password);
else if(body.password === result.password ){
    
    result.password=undefined;
    const jsontoken = sign({results:result},"qwe1234",{
        expiresIn: '1h'

    });
    res.cookie("jwt",jsontoken,{

        expires:new Date(Date.now() + 60000),
        httpOnly:true
    });
    
    // return res.send({
    //     success: 1,
    //     message:"login successfully",
    //     token: jsontoken
    // });
    axios.get('https://arcane-beyond-69154.herokuapp.com/api/users/available').then(resp =>{
        ans= resp.data;
        console.log(ans.data)  
        
                res.render("home2",{result:ans.data,result1:""})
      //  console.log(ans);
});
// console.log(ans)
//     res.render("home2",{ans:ans[0].floor});

}else {
    err_msg="invalid email or password";
    return res.render("ParkingSystemLogin",{err_msg: err_msg});
    // return res.send({
    //     success: 0,
    //     data: "invalid email or password"
    // });
}
});
},
//   ""
checkin:(req,res)=> {
    const body = req.body;
    console.log(body);

   //const salt = genSaltSync(10); 
    //body.password = hashSync(body.password,salt);

    create(body, (error,result1) =>
    {
        if(error) {
            console.log(error);
            return;
        }
        console.log(result1);
        if(!result1) {

            return res.json({
                success: 0,
                message: "record not found"
                

            });
        }
      //  res.render("home2",{result:result});
        // return res.json ({
        //     success: 1,
        //     data: result
        // });
        axios.get('https://arcane-beyond-69154.herokuapp.com/api/users/available').then(resp =>{
        ans= resp.data;
        console.log(ans.data)  
      //var alert=window("YOUR TOKEN IS" + result1);
                res.render("home2",{result:ans.data,result1:result1})
      //  console.log(ans);
});
        
            });
        },
    


checkout:(req,res) => {
    const body = req.body;
   //   console.log("hello");
    console.log(body);
   //const salt = genSaltSync(10); 
    //body.password = hashSync(body.password,salt);

    create2(body, (error,result2) =>
    {
        if(error) {
            console.log(error);
            return;
        }
        if(!result2) {
            return res.json({
                success: 0,
                message: "record not found"
            });
        }
        
        // return res.json ({
        //     success: 1,
        //     data: result
        // });
        axios.get('https://arcane-beyond-69154.herokuapp.com/api/users/available').then(resp =>{
            ans= resp.data;
            console.log(ans.data)  
            console.log("charges"+result2);
                    res.render("checkout",{result:ans.data,result1:"",result2:result2.charges})
          //  console.log(ans);
        });
    //    res.render("checkout",{result:result});
            });
        },
invoice: (req,res) =>{
    const body = req.body;
    console.log(body);
        create3(body,(err,result) => {
if(err) {
    console.log(err);
    return res.json({
        success:0,
        message:"db error"
    });
}
console.log("result fullname "+ result.fullname);
        
res.render("invoice",{result : result});
});

// return res.json({
//     success: 1,
//     data: result
// });
    
},
    
    history: (req,res) =>{
        const body = req.body;
        console.log(body);
            create4(body,(err,result) => {
    if(err) {
        console.log(err);
        return res.json({
            success:0,
            message:"db error"
        });
    }
    result.forEach((item) =>
     {console.log(item)});

    res.render("historyresult",{result:result});
    // return res.json({
    //     success: 1,
    //     data: result
    
        });
    },
    available: (req,res) =>{
       
            create5((err,result) => {
    if(err) {
        console.log(err);
       return;
    }
    
    return res.json({
        success: 1,
        data: result
    });
        });
    },
    nonavailable: (req,res) =>{
       
        create6((err,result) => {
if(err) {
    console.log(err);
   return;
}

return res.json({
    success: 1,
    data: result
});
    });
},
}











