const express = require("express");
const app = express()
const db = require("./models");
require("dotenv").config()
const { User } =require("./models/index")  // require models here with model names
//__________________________________________________________________________________________________________







app.get("/",async(req,res)=>{
    try {
        // await User.create({name:"Anandhu",email:"anandhupa131@gmail.com",password:"123456"})
        // let data = await User.findAll();
        res.send("home route")
    } catch (error) {
        console.log(error)
    }
})



//_________________________________________________________________________________________________________
db.sequelize.sync().then(()=>{
    app.listen(process.env.port,async(req,res)=>{
        try{
            console.log(`server started @ http://localhost:${process.env.port}`)
        }catch(err){console.log("error in connection",err)}
    })
})
