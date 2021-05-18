const checkAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) return res.redirect("/login");

  next();
};

module.exports = checkAuth;
