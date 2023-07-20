const { userInfoValidation1,userInfoValidation2 } = require("../controllers/validations.controller");
const { authenticateUser } = require("../middlewares/authenticate.controller");
const userRouter = require("express").Router();
const { User } =require("../models/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//registration 
userRouter.post("/register",userInfoValidation1,async(req,res)=>{
    try {
        let userExists = await User.findOne({
            where : {email:req.body.email}
        })
        if(userExists){res.status(409).json("Email is already registered, kindly login")}
        else {
            let data = await User.create(req.body);
            res.send(data)
        }
        
    } catch (error) {
        console.log("error in get , login",error)
    }
})


//login
userRouter.post("/login",userInfoValidation2,async(req,res)=>{
    try {
        let userExists = await User.findOne({
            where : {email:req.body.email}
        })
        if(!userExists){res.status(404).json("Please register with your credentials")}
        else {
            const val = await bcrypt.compare(req.body.password,userExists.get("password"));
            if(val){
            //creating and sending authToken
            const  token = jwt.sign({ userId: userExists.get("id") }, process.env.jwt_secret_key);
            res.cookie("authToken",token)
            res.send({msg:`Hi ${userExists.name}, you have logined successfully.`,authToken:token})
            }else {res.status(401).send("please enter password correctly")}
        }
        
    } catch (error) {
        console.log("error in post , login",error)
    }
})

userRouter.get("/profile",authenticateUser,async(req,res)=>{
    try {
        let data = await User.findOne({
            where:{id:req.body.userId}
        })
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})



module.exports ={userRouter}