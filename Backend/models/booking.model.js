module.exports = (sequelize,DataTypes)=>{
    const appointment = sequelize.define("Booking",{

          studentID : {
            type : DataTypes.STRING,
            refrences : {model : "Users", key : "id"}
          },
          date: {
            type: DataTypes.DATEONLY,
            allowNull: false
          },
          timeSlot: {
            type: DataTypes.TIME,
            allowNull: false
          },
          day: {
            type: DataTypes.STRING,
            allowNull: false
          },
          meetingType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          instructorID : {
            type : DataTypes.STRING,
            refrences : {model : "Users", key : "id"}
          },
          meetingStatus: {
            type: DataTypes.ENUM('accepted', 'pending', 'rejected'),
            allowNull: false,
            defaultValue: 'pending'
          }
       })

    return appointment;
}    

    