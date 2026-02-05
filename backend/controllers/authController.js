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
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      response.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
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
            response.clearCookie("refreshToken", {
              httpOnly: true,
              secure: true,
            });
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
  verify: async (req, res, next) => {
    const accessToken = req.token;
    try {
      if (!accessToken) {
        return res.status(401).json({ error: "token not provided" });
      }
      const decodedToken = jwt.verify(req.token, config.ACCESS_TOKEN_SECRET);
      console.log(decodedToken);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, response, next) => {
    try {
      response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return response.status(200).json({ error: "Logged out!" });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = authController;
