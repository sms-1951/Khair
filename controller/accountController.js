const User = require('../model/user');
const mongoose = require('mongoose');


const updateData = async (req, res) => {
    const { name, email, phoneNumber} = req.body;
    let userSession = req.session.user;

    try {
      // Check if username already exists
      let user = await User.findOne({ email: email, _id: { $ne: userSession._id }
    });
      if (user) {
        return res.send('<script>alert("Email already exists with another user."); window.location.href = "/account";</script>');
      }
      const result = await User.findByIdAndUpdate(
        userSession._id,
        { $set: req.body },
        { new: true }
      )
  
      // Create session and redirect to account
      req.session.user = result;
      res.redirect('/changeSuccess');
    } catch (error) {
      console.error(error);
      return res.send('<script>alert("Oops! Something went wrong. Please try again later."); window.location.href = "/signup";</script>');  }
  };
module.exports = {
    updateData: updateData
  };
