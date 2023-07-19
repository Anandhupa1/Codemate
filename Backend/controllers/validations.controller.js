
function userInfoValidation1(req,res,next){
    if(!req.body.name){res.status(422).json("please provide a name")}
    else if(!req.body.email){res.status(422).json("please provide an email")}
    else if(!validateEmail(req.body.email)){res.status(422).json("please provide a valid email")}
    else if((!req.body.password || !req.body.cPassword) || req.body.password!==req.body.cPassword){res.status(422).json("please provide password correctly")}
    else{next()}
}
function userInfoValidation2(req,res,next){
 
  if(!req.body.email){res.status(422).json("please provide an email")}
  else if(!validateEmail(req.body.email)){res.status(422).json("please provide a valid email")}
  else if((!req.body.password )){res.status(422).json("please provide password correctly")}
  else{next()}
}
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }


module.exports={userInfoValidation1,userInfoValidation2,validateEmail}