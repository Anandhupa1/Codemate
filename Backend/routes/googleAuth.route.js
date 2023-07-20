const googleAuthRouter = require("express").Router();
const { User } =require("../models/index");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken")
const {passport} = require("../config/google.oAuth")




googleAuthRouter.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

googleAuthRouter.get( '/callback',
    passport.authenticate( 'google', {
        failureRedirect: `${process.env.frontendDeployedLink}/login`, 
        session:false 
}),
async (req,res)=>{

    //console.log(req.user)__________________________________________________________________
    
    let userExists = await User.findOne({
        where : {email:req.user.email}
    })
    
    if(!userExists){
        //create new user in Database
        await User.create(req.user);
        userExists = await User.findOne({
            where : {email:req.user.email}
        })
    }
    //_____use user data and attach authToken__________________________________________________________________________________
        const  token = jwt.sign({ userId: userExists.get("id") }, process.env.jwt_secret_key);
        res.cookie("authToken",token)
        
    //redirect user to home page (frontend)_______________________________________________________________________________________
    res.redirect(`${process.env.frontendDeployedLink}?t=${token}`) //redirect to any page
}

);













module.exports={googleAuthRouter}