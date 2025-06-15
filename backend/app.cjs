const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("dist"));
app.use(express.json());
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);
const routesRouter = require("./routes/routesRouter.cjs");
app.use("/api/routes", routesRouter);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);
const errorHandler = (err, req, resp, next) => {
  console.log(err.message);
  if (err.name === "CastError") {
    return resp.status(400).send({ err: "malformatted Id" });
  } else if (err.name === "ValidationError") {
    return response.status(400).json({ err: err.message });
  }
  next(err);
};
app.use(errorHandler);
app.listen(port, () => {
  console.log(
    `server running on PORT ${process.env.PORT || 3000}  http://localhost:${
      process.env.PORT || 3000
    }`
  );
});
