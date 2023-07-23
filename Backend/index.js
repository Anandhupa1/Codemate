const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { User } =require("./models/index");  // require models here with model names
const { userRouter } = require("./routes/users.route");
const { IndexRouter } = require("./routes/index.router");
const { googleAuthRouter } = require("./routes/googleAuth.route");
const { authenticateUser } = require("./middlewares/authenticate.controller");
const { bookingRouter } = require("./routes/booking.route");


//middlewares(inbuilt & third party)_________________________________________________________________________________________________________
// app.use(cors({
//     origin: process.env.frontendDeployedLink,
//     credentials: true
//   }));
//+++++++++++++++++++++++
app.use(cors({
  origin: 'https://tutor-track.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'authToken'], // Include 'authToken' in the list of allowed headers
}));
//++++++++++++++++++++++
// const corsOptions = {
//     origin: (origin, callback) => {
//       // Allow requests from any origin
//       callback(null, true);
//     },
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
  
  // Enable CORS with the custom function allowing all origins
  // app.use(cors(corsOptions));
  
app.use(express.json())
app.use(cookieParser())


//Mounted middlewares___________________________________________________________________________________________________

app.use("/",IndexRouter);
app.use("/user",userRouter);
app.use("/auth/google",googleAuthRouter);
app.use("/bookings",bookingRouter);




//_________________________________________________________________________________________________________
db.sequelize.sync().then(()=>{
    app.listen(process.env.port,async(req,res)=>{
        try{
            console.log(`server started @ http://localhost:${process.env.port}`);

        }catch(err){console.log("error in connection",err)}
    })
})