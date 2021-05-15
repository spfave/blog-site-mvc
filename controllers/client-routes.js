const router = require("express").Router();

// Homepage
router.get("/", async (req, res) => {
  // Get all blog articles

  res.send("<h1>Homepage<h1>");
  // res.render("home");
});

// Dashboard
// router.get("/dashboard", async (req,res) => {
//   // check logged in - redirect to login

//   res.render("dashboard");
// });

// Get single article with comments

// Create article

// Edit article

// Login
// router.get("/login", (req, res) => {
//   // check logged in - redirect to dashboard

//   res.render("login");
// });

// Sign up

module.exports = router;
