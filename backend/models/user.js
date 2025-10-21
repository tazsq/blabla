const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    minLength: 2,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  createdRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }], // routes created by user (driver)
  joinedRoutes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Route" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.passwordHash;
    delete returnedObject.__v;
  },
});
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY,
    }
  );
};
module.exports = mongoose.model("User", userSchema);
