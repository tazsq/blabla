const express = require("express");
const path = require("node:path");
const { authorController } = require("./controllers/authorController.cjs");
const cors = require("cors");
const app = express();
// const assetsPath = path.join(__dirname, "public");
// app.use(express.static(assetsPath));
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
const PORT = 4001;
//using ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//learning fundamentals of middleware

const errorLogger = (req, res, next) => {
  console.error("error");
  next();
};

const routesRouter = require("./routes/routesRouter.cjs");
const userRouter = require("./routes/userRouter.cjs");
app.use("/api/routes", routesRouter);
app.use("/api/users", userRouter);
app.get("/api/authors/:authorId", authorController.get);
app.use(errorLogger);
app.listen(PORT, () => {
  console.log("server running");
});
