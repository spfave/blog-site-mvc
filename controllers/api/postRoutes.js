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
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: { id: req.params.id }, //, user_id: req.session.user_id
    });

    if (!postData[0]) {
      res.status(404).json({ message: `Post does not exist to update` });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete post
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: `Post does not exist to delete` });
      return;
    }

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
