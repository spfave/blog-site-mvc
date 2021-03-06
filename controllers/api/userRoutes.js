const router = require("express").Router();
const { User } = require("../../models");

// Signup new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (error) {
    // switch (true) {
    //   case error.name === "SequelizeUniqueConstraintError": {
    //     res.status(400).json({ message: "error" });
    //     break;
    //   }
    //   default: {
    //     res.status(500).json(error);
    //     break;
    //   }
    // }

    res.status(400).json(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validatePassword = await userData.checkPassword(req.body.password);
    if (!validatePassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (error) {
    res.json(400).json(error);
  }
});

// Logout user
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
