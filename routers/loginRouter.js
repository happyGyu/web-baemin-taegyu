const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(db.get("users").find({ email }).value());
});

module.exports = router;
