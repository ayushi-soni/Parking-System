const{verify} = require("jsonwebtoken");

module.exports = {
 
    checkToken:(req,res,next) =>
    {
        //let token = req.get("authorization");
        let token = req.cookies.jwt;  // through these we get the token from the cookie.
        console.log(token);  
        
        if(token) {
            //token = token.slice(7);

            verify(token,"qwe1234",(err,decoded) =>{
                if(err) {
                    res.json({
                        success:0,
                        message:"invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            // res.json({
            //     success:0,
            //     message: "access denied unauthorized user"
            // });
            res.render("ParkingSystemHome")
        }
    }

};