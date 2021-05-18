const router = require("express").Router();
const { User, Post } = require("../models");

// Homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
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
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Sign up
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
