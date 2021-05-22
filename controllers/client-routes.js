const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const checkAuth = require("../utils/auth");

// Homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
    // res.json({ posts, logged_in: req.session.logged_in }); // testing
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

// Get single post with comments
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const post = postData.get({ plain: true });

    res.render("post", { ...post, logged_in: req.session.logged_in });
    // res.json({ ...post, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json(error);
  }
});

// New post
router.get("/dashboard/new-post", checkAuth, async (req, res) => {
  try {
    res.render("post-manage", {
      newPost: true,
      logged_in: req.session.logged_in,
    });
    // res.json({ newPost: true, logged_in: req.session.logged_in }); // testing
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit post
router.get("/dashboard/edit-post/:id", checkAuth, async (req, res) => {
  try {
    // const postData = await Post.findByPk(req.params.id);
    // const post = postData.get({ plain: true });

    res.render("post-manage", {
      newPost: false,
      logged_in: req.session.logged_in,
    });
    // res.json({ ...post, newPost: false, logged_in: req.session.logged_in }); // testing
  } catch (error) {
    res.status(500).json(error);
  }
});

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
