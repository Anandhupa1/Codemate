const {authorizeRole} = require("../middlewares/authorizeRole");
const {Booking} = require("../models/index");
const bookingRouter = require("express").Router();
const {authenticateUser} = require("../middlewares/authenticate.controller");
const { checkConflict } = require("../middlewares/conflicChecking");


async function isTutorAvailable(tutorID, date, timeSlot) {
  try {
    const startTime = new Date(`${date} ${timeSlot}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 

    const existingAppointment = await Booking.findOne({
      where: {
        instructorID: tutorID,
        date: {
          [Op.eq]: date
        },
        timeSlot: {
          [Op.between]: [timeSlot, endTime.toTimeString().slice(0, 8)]
        }
      }
    });
    return !existingAppointment;
  } catch (error) {
    console.error('Error checking tutor availability:', error);
    throw new Error('An error occurred while checking tutor availability.');
  }
}

// Get route for Bookings
bookingRouter.get("/",authenticateUser, async(req,res)=>{
  try {
      let availableRoles =["student","tutor"]
      let obj ={};
      if(req.query.role){
           if(availableRoles.includes(req.query.role) ){
              if(req.query.role==="student"){
                obj.studentID = req.body.userId
              }else{
                obj.instructorID = req.body.userId
              }
              
              let data = await Booking.findAll({
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
    
//Make a new Booking
bookingRouter.post("/book-slot/:instructorID",authenticateUser, authorizeRole,checkConflict, async(req,res)=>{

    const instructorID = req.params.instructorID;
    const studentID = req.body.userId;
    console.log(req.body)
    try {
        const { date, timeSlot, day, meetingType } = req.body;

        // const isAvailable = await isTutorAvailable(instructorID, date, timeSlot);

        // if (!isAvailable) {
        //   return res.status(400).json({ error: 'Tutor is not available during the requested time slot.' });
        // }

        const newBooking = await Booking.create({
            instructorID,
            studentID,
            date,
            timeSlot,
            day,
            meetingType
          });
    
          res.status(200).json({ message: 'Booking successful!', booking: newBooking });
        } catch (error) {
          console.error('Error creating booking:', error);
          res.status(500).json({ error: 'An error occurred while booking the instructor.' });
        }
})

// Update Route for booking
bookingRouter.patch("/update/:bookingID", authenticateUser, async(req,res)=> {
    try {
        const { bookingID } = req.params;
        const { date, timeSlot, meetingStatus } = req.body;
        const user = req.user; 

        const booking = await Booking.findOne({where:{id:Number(req.params.bookingID)}});
    
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found.' });
        }
    
        // if (user.role === 'tutor' && booking.instructorID !== user.id) {
        //   return res.status(403).json({ error: 'Forbidden. You are not authorized to update this booking.' });
        // } else if (user.role === 'student' && booking.studentID !== user.id) {
        //   return res.status(403).json({ error: 'Forbidden. You are not authorized to update this booking.' });
        // }
    
        await booking.update({ date, timeSlot, meetingStatus });
    
        res.json({ message: 'Booking updated successfully!', updatedBooking: booking });
      } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'An error occurred while updating the booking.' });
      }
})

// Delete the booking route
bookingRouter.delete('/delete/:bookingID',authenticateUser, async (req, res) => {
    try {
      const { bookingID } = req.params;
      const user = req.user;
  
      const booking = await Booking.findOne({ where:{id:bookingID}});;
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
 
      // if (user.role === 'instructor' && booking.instructorID !== user.id) {
      //   return res.status(403).json({ error: 'Forbidden. You are not authorized to delete this booking.' });
      // } else if (user.role === 'student' && booking.studentID !== user.id) {
      //   return res.status(403).json({ error: 'Forbidden. You are not authorized to delete this booking.' });
      // }

      await booking.destroy();
  
      res.json({ message: 'Booking deleted successfully!' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'An error occurred while deleting the booking.' });
    }
})


module.exports = {bookingRouter};