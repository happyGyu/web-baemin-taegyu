const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.render("main", { title: "배민 회원" });
});

router.get("/login", (_, res) => {
  res.render("login", { title: "로그인" });
});

module.exports = router;
