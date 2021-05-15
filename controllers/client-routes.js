const { route } = require(".");

const router = require("express").Router();

// Homepage
router.get("/", async () => {
  res.render("home");
});

// Login
router.get("/login", () => {
  res.render("login");
});

// Dashboard
router.get("/dashboard", async () => {
  res.render("dashboard");
});
