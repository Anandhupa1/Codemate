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
            //creating and sending authToken after registering for first time.
            const  token = jwt.sign({ userId: data.get("id") }, process.env.jwt_secret_key);
            
            res.send({msg:`Hi ${data.get("name")}, you have registered successfully.`,authToken:token})
        }
        
    } catch (error) {
        console.log("error in get , register",error)
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
            res.send({msg:`Hi ${userExists.get('name')}, you have logined successfully.`,authToken:token})
            }else {res.status(401).json("please enter password correctly")}
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
userRouter.patch("/update",authenticateUser,async(req,res)=>{
    try {
        let {role,password,cPassword,...obj}=req.body;
       

        const updatedUser  = await User.update(
            obj,
            {
              where: { id: req.body.userId },
              returning: true // This option is required to get the updated record as a result
            }
          );
      let output = await User.findOne({where:{id:req.body.userId}});
      res.send(output)

    } catch (error) {
        console.log(error)
    }
})

userRouter.delete("/delete/:id",authenticateUser,async(req,res)=>{
    try {
       
       

        const updatedUser  = await User.update(
            {deleted:true},
            {
              where: { id: req.params.id },
              returning: true // This option is required to get the updated record as a result
            }
          );
      let output = await User.findOne({where:{id:req.params.id}});
      res.send(output)

    } catch (error) {
        console.log(error)
    }
})


module.exports ={userRouter}