const IndexRouter = require("express").Router();
const {authenticateUser} =require("../middlewares/authenticate.controller");
const { User } =require("../models/index");



IndexRouter.get("/",async(req,res)=>{
    try {
         await User.create({name:"Anandhu",email:"anandhupa131@gmail.com",password:"123456"})
         let data = await User.findAll();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})





module.exports={IndexRouter}