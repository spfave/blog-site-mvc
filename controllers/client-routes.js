const router = require("express").Router();
const { User, Post } = require("../models");
const checkAuth = require("../utils/auth");

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
router.get("/dashboard", checkAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });

    res.render("dashboard", { ...user, logged_in: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

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
