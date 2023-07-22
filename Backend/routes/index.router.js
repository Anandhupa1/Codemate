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



IndexRouter.get("/users",async(req,res)=>{
    try {
        let availableRoles =["student","tutor","admin"]
        let obj ={role:"student"}
        if(req.query.role){
            
             if(availableRoles.includes(req.query.role) ){
                obj.role=req.query.role
                let data = await User.findAll({
                    where : obj,
                })
        
                res.send(data)

            }
            else {res.status(404).json("please query upon [ 'student' or 'tutor' or 'admin' ] ")}
        }else { res.status(404).json("please query upon [ 'student' or 'tutor' or 'admin' ] ")}
       
        

        //___________________________________________________
    
    } catch (error) {
        
    }
})


module.exports={IndexRouter}