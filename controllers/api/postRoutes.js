const router = require("express").Router();
const { Post } = require("../../models");
const checkAuth = require("../../utils/auth");

// Create new post
router.post("/", checkAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update post
router.put("/:id", checkAuth, async (req, res) => {});

// Delete post
router.delete("/:id", checkAuth, async (req, res) => {});

module.exports = router;
