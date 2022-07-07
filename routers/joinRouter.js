const express = require("express");
const router = express.Router();

router.get("/agree", (_, res) => {
  res.render("agree", { title: "회원가입 | 약관동의" });
});

module.exports = router;
