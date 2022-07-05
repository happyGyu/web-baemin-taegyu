const express = require("express");
const pageRouter = require("./routers/pageRouter");
const port = 3000;
const app = express();

app.set("view engine", "pug");
app.use("/", pageRouter);

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}`);
});
