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
const port = process.env.PORT || 3000;
//using ejs
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

const routesRouter = require("./routes/routesRouter.cjs");
const userRouter = require("./routes/userRouter.cjs");
app.use("/api/routes", routesRouter);
app.use("/api/users", userRouter);
app.get("/api/authors/:authorId", authorController.get);

app.listen(port, () => {
  console.log("server running");
});
