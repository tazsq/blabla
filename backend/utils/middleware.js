const jwt = require("jsonwebtoken");
const config = require("./config");
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = null;
  }
  next();
};

const tokenVerifier = (req, resp, next) => {
  try {
    if (!req.token) {
      return resp.status(401).json({ error: "token not provided" });
    }
    const token = req.token;
    const decodedToken = jwt.verify(token, config.SECRET);
    return decodedToken;
  } catch (err) {
    next(err);
  }
};
const errorHandler = (err, req, resp, next) => {
  console.log(err.message);
  if (err.name === "CastError") {
    return resp.status(400).send({ err: "malformatted Id" });
  } else if (err.name === "ValidationError") {
    return resp.status(400).json({ err: err.message });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return resp.status(400).json({ err: "expected `username` to be unique" });
  } else if (err.name === "JsonWebTokenError") {
    return resp.status(401).json({ error: "token invalid" });
  } else if (err.name === "TokenExpiredError") {
    return resp.status(401).json({
      error: "token expired",
    });
  }
  next(err);
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  tokenVerifier,
};
