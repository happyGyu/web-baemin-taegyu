const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = db.get("users").find({ email }).value();
  if (!user) {
    req.session.isWrong = true;
    res.redirect("/login");
  }
  if (password !== user.password) {
    req.session.isWrong = true;
    res.redirect("/login");
  }

  req.session.user = user;
  res.redirect("/");
});

module.exports = router;
