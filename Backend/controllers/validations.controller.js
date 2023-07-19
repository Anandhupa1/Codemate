
function userInfoValidation(req,res,next){
    if(!req.body.name){res.status(422).json("please provide a name")}
    else if(!req.body.email){res.status(422).json("please provide an email")}
    else if((!req.body.password || !req.body.cPassword) || req.body.password!==req.body.cPassword){res.status(422).json("please provide password correctly")}
    else{next()}
}




module.exports={userInfoValidation}