// controllers/authController.js

const bcrypt = require('bcrypt');
const User = require('../model/user');

// Render login form
const getLogin = (req, res) => {
  res.render('login');
};

// Handle login form submission
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ email: email });

    // If user not found, render login form with error message
    if (!user) {
      return res.send('<script>alert("User not found."); window.location.href = "/login";</script>');
    }
    
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('<script>alert("Invalid email or password."); window.location.href = "/login";</script>');
    }

    // If username and password are correct, create session and redirect to dashboard
    req.session.user = user;

    res.redirect('/charities');
  } catch (error) {
    console.error(error);
    return res.send('<script>alert("Oops! Something went wrong. Please try again later."); window.location.href = "/login";</script>');
  }
};

// Handle registration form submission
const postRegister = async (req, res) => {
  const { email, name, address, phoneNumber, password} = req.body;

  try {
    // Check if username already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.send('<script>alert("User already exists."); window.location.href = "/login";</script>');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
     user = new User({
      email,
      name,
      address,
      phoneNumber,
      password: hashedPassword
    });
  await user.save();

    // Create session and redirect to dashboard
    req.session.user = user;
    res.redirect('/charities');
  } catch (error) {
    console.error(error);
    return res.send('<script>alert("Oops! Something went wrong. Please try again later."); window.location.href = "/signup";</script>');  }
};

const logout_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  })
};

module.exports = {
     getLogin:getLogin, 
    postLogin:postLogin,
    postRegister: postRegister,
    logout_post: logout_post
};

