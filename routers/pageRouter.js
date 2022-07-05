const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.render("main");
});

module.exports = router;
