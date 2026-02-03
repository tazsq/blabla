const bcrypt = require("bcrypt");
const User = require("../models/user");
const { request, response } = require("../app");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const authController = {
  login: async (request, response, next) => {
    try {
      const { username, password } = request.body;
      const user = await User.findOne({ username });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: "invalid username or password",
        });
      }
      console.log(user);
      // const userForToken = {
      //   username: user.username,
      //   id: user._id,
      // };

      // const token = jwt.sign(userForToken, config.SECRET, {
      //   expiresIn: 60 * 60,
      // });
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      response.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return response
        .status(200)
        .send({ accessToken, username: user.username, name: user.name });
    } catch (err) {
      next(err);
    }
  },
  refresh: async (request, response, next) => {
    try {
      const refreshToken = request.cookies.refreshToken;
      if (!refreshToken) {
        return response.status(401).json({ error: "Refresh token missing" });
      }
      await jwt.verify(
        refreshToken,
        config.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return response
              .status(401)
              .json({ error: "invalid refresh token" });
          }

          const user = await User.findById(decoded.id);
          if (!user) {
            return response.status(404).json({ error: "user not found" });
          }

          const newAccessToken = user.generateAccessToken();

          return response.status(200).json({
            accessToken: newAccessToken,
          });
        },
      );
    } catch (error) {
      next(error);
    }
  },
};
module.exports = authController;
