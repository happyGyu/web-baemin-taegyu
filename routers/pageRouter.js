const express = require("express");
const { mainPageCategoryList, mainPageMenuList } = require("./constant");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("main", {
    title: "배민 회원",
    mainPageCategoryList,
    mainPageMenuList,
    userInfo: req.session.user,
  });
});

router.get("/login", (req, res) => {
  const isWrong = req.session.isWrong;
  req.session.isWrong = null;
  res.render("login", { title: "로그인", isWrong });
});

module.exports = router;
