const express = require("express");
const db = require("../db/db");
const router = express.Router();

router.get("/agree", (_, res) => {
  res.render("agree", { title: "회원가입 | 약관동의" });
});

router.get("/auth", (_, res) => {
  res.render("auth", { title: "회원가입 | 인증" });
});

router.get("/user-info", (_, res) => {
  res.render("userInfo", { title: "회원가입 | 정보입력" });
});

router.post("/user-info", (req, res) => {
  db.get("users")
    .push({
      email: req.body["email-input"],
      nickname: req.body["nickname-input"],
      password: req.body["password-input"],
      birthday: req.body["birthday-input"],
    })
    .write();

  res.redirect("/login");
});

module.exports = router;
