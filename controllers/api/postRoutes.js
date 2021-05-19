const router = require("express").Router();
const { Post } = require("../../models");
const checkAuth = require("../../utils/auth");

// Create new post
router.post("/", checkAuth, async (req, res) => {});

// Update post
router.put("/:id", checkAuth, async (req, res) => {});

// Delete post
router.delete("/:id", checkAuth, async (req, res) => {});

module.exports = router;
