const express = require("express");
const config = require("./utils/config.js");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware.js");
const app = express();
const usersRouter = require("./routes/usersRouter.js");
const routesRouter = require("./routes/routesRouter.js");
const authRouter = require("./routes/authRouter.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MaongoDB:", error.message);
  });
app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
    credentials: true, // ✅ this is mandatory for cookies
  }),
);
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/routes", routesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
