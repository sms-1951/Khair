
 const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "You have to Login first";
    res.redirect("/login");
  }
};

module.exports={
  isAuth: isAuth
};
