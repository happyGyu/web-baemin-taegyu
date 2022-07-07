const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");
const pageRouter = require("./routers/pageRouter");
const { uuid } = require("uuidv4");
const port = 3001;
const app = express();

app.use("/style", express.static(path.join(__dirname, "public", "style")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/asset", express.static(path.join(__dirname, "public", "asset")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "slkdfjldskfjkTAEGYU",
    resave: false,
    saveUninitialized: true,
    genid: uuid,
    cookie: { httpOnly: true, secure: false },
  })
);

app.set("view engine", "pug");
app.use("/join", joinRouter);
app.use("/login", loginRouter);
app.use("/", pageRouter);

app.listen(port, () => {
  console.log(`hearing on http://localhost:${port}`);
});
