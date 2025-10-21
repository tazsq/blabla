require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
module.exports = {
  MONGODB_URI,
  PORT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
};
