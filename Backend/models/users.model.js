const bcrypt = require("bcrypt")
const {redisClient} = require("../config/redis.connection")
module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{

        name : {type:DataTypes.STRING,allowNull:false},
        email : {type:DataTypes.STRING,allowNull:false,validate: { isEmail: true, },},
        password : {type:DataTypes.STRING,allowNull:false},
        profilePic : {type:DataTypes.STRING,defaultValue: 'https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg'},
        role: { type: DataTypes.ENUM('student', 'tutor', 'admin'),defaultValue: 'student',},
        deleted : {type:DataTypes.BOOLEAN,defaultValue:false},
        location : {type:DataTypes.STRING},
        description : {type:DataTypes.STRING},
        subject : {type:DataTypes.STRING},
        fees : {type:DataTypes.INTEGER},
        
    })

        // Before saving the user, hash the password using bcrypt
        User.beforeCreate(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        });




        
        // User.cache(redisClient);
        return User;
        };
    

    