const express = require("express");
const path = require("path");
const joinRouter = require("./routers/joinRouter");
const pageRouter = require("./routers/pageRouter");
const port = 3001;
const app = express();

app.use("/style", express.static(path.join(__dirname, "public", "style")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));

app.set("view engine", "pug");
app.use("/join", joinRouter);
app.use("/", pageRouter);

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}`);
});
