const jwt = require('jsonwebtoken');



async function  authenticateUser (req,res,next){
    let incToken = req.headers.authtoken;
    if(incToken){
        await jwt.verify(incToken, process.env.jwt_secret_key, function(err, decoded) {
            if(err){
            res.status(401).json("invalid token")
             }else {
                 //console.log(decoded.userId,"decoded");
                 req.body.userId =decoded.userId;
                // console.log(req.body)
                next()
             }
         }); 
     

    }else {res.status(401).json("you are not authenticated")}

}


module.exports = {authenticateUser}