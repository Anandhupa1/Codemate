module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{

        name : {type:DataTypes.STRING,allowNull:false},
        email : {type:DataTypes.STRING,allowNull:false,validate: { isEmail: true, },},
        password : {type:DataTypes.STRING,allowNull:false},
        profilePic : {type:DataTypes.STRING,defaultValue: 'https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg'},
        role: { type: DataTypes.ENUM('student', 'instructor', 'admin', 'moderator'),defaultValue: 'student',},
        
        
        
       
    
    })
    return User;
    
    }