const {Sequelize,Booking} = require("../models/index");

async function checkConflict(req,res,next){
try {
    //____________________________________________________
    // const instructorID = req.params.instructorID;
    const { date, timeSlot, day, meetingType } = req.body;
    let startTime = timeSlot;
    const timeSlotDate = new Date(`1970-01-01T${timeSlot}`);
    timeSlotDate.setHours(timeSlotDate.getHours() + 1);

    const endTime = timeSlotDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
// console.log(endTime); // Output: '15:30:00'

    const existingAppointment = await Booking.findOne({
        where: {
          instructorID: req.params.instructorID,
          date: date,
          timeSlot: {
            [Sequelize.Op.between]: [startTime, endTime],
          },
        },
      });
      if(existingAppointment){res.status(409).json("Tutor is not available at selected timeSlot.")}
      else {next()}
    //____________________________________________________
} catch (error) {
    console.log(error)
}
}

module.exports={checkConflict}