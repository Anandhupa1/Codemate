const { userInfoValidation } = require("../controllers/validations.controller");

const userRouter = require("express").Router();


//user login 

userRouter.post("/login",userInfoValidation(req,res,next),async(req,res)=>{
    try {
        res.send(req.body)
    } catch (error) {
        console.log("error in get , login",error)
    }
})







module.exports ={userRouter}