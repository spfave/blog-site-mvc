const router = require("express").Router();
const { Post } = require("../models");

// Homepage
router.get("/", async (req, res) => {
  // Get all blog articles
  try {
    const postData = await Post.findAll();

    const posts = postData.map(({ dataValues }) => dataValues);

    res.json(posts);
    // res.render("homepage",{posts});
  } catch (error) {
    res.status(500).json();
  }
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
