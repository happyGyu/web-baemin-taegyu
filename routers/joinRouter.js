const express = require("express");
const router = express.Router();

router.get("/agree", (_, res) => {
  res.render("agree", { title: "회원가입 | 약관동의" });
});

router.get("/auth", (_, res) => {
  res.render("auth", { title: "회원가입 | 인증" });
});

module.exports = router;
