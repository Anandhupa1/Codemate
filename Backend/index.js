const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { User } =require("./models/index");  // require models here with model names
const { userRouter } = require("./routes/users.route");
const { IndexRouter } = require("./routes/index.router");
//_________________________________________________________________________________________________________
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())


//routes___________________________________________________________________________________________________

app.use("/",IndexRouter);
app.use("/user",userRouter);


//_________________________________________________________________________________________________________
db.sequelize.sync().then(()=>{
    app.listen(process.env.port,async(req,res)=>{
        try{
            console.log(`server started @ http://localhost:${process.env.port}`)
        }catch(err){console.log("error in connection",err)}
    })
})