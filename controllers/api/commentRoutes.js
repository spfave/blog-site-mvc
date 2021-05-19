const router = require("express").Router();
const { Comment } = require("../../models");
const checkAuth = require("../../utils/auth");

// Create new comment
router.post("/", checkAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
