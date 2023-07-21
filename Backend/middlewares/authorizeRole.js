// Middleware for role-based authorization (only students can book a slot)
const {User} = require("../models/index");
const authorizeRole = async (req, res, next) => {
    const user = req.body.userId;

    const StudentUser = await User.findOne({
      where:{id:user}
    });
    console.log(StudentUser);

    if (!StudentUser || StudentUser.role !== 'student') {
      return res.status(403).json({ error: 'Only students can book a slot.' });
    }
  
    next();
  };
  
  module.exports = {authorizeRole};
  