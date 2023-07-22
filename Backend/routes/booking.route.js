const {authorizeRole} = require("../middlewares/authorizeRole");
const {Booking} = require("../models/index");
const bookingRouter = require("express").Router();
const {authenticateUser} = require("../middlewares/authenticate.controller");
const { checkConflict } = require("../middlewares/conflicChecking");

//Make a new Booking
bookingRouter.post("/book-slot/:instructorID",authenticateUser, authorizeRole,checkConflict, async(req,res)=>{

    const instructorID = req.params.instructorID;
    const studentID = req.body.userId;

    try {
        const { date, timeSlot, day, meetingType } = req.body;

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

bookingRouter.put("/update/:bookingID", authenticateUser, authorizeRole, async(req,res)=> {
    try {
        const { bookingID } = req.params;
        const { date, timeSlot } = req.body;
        const user = req.user; 

        const booking = await Booking.findOne({where:{id:user}});
    
        if (!booking) {
          return res.status(404).json({ error: 'Booking not found.' });
        }
    
        if (user.role === 'instructor' && booking.instructorID !== user.id) {
          return res.status(403).json({ error: 'Forbidden. You are not authorized to update this booking.' });
        } else if (user.role === 'student' && booking.studentID !== user.id) {
          return res.status(403).json({ error: 'Forbidden. You are not authorized to update this booking.' });
        }
    
        await booking.update({ date, timeSlot });
    
        res.json({ message: 'Booking updated successfully!', updatedBooking: booking });
      } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'An error occurred while updating the booking.' });
      }
})

// Delete the booking route
bookingRouter.delete('/delete/:bookingID', authorizeRole, async (req, res) => {
    try {
      const { bookingID } = req.params;
      const user = req.user;
  
      const booking = await BookingfindOne({ where:{id:user}});;
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
 
      if (user.role === 'instructor' && booking.instructorID !== user.id) {
        return res.status(403).json({ error: 'Forbidden. You are not authorized to delete this booking.' });
      } else if (user.role === 'student' && booking.studentID !== user.id) {
        return res.status(403).json({ error: 'Forbidden. You are not authorized to delete this booking.' });
      }

      await booking.destroy();
  
      res.json({ message: 'Booking deleted successfully!' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'An error occurred while deleting the booking.' });
    }
})


module.exports = {bookingRouter};