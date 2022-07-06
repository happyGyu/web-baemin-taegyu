const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.render("main", { title: "테스트 타이틀" });
});

module.exports = router;
