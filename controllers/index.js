const router = require("express").Router();

const clientRoutes = require("./client-routes.js");
const apiRoutes = require("./api");

router.use("/", clientRoutes);
router.use("/api", apiRoutes);

module.exports = router;
