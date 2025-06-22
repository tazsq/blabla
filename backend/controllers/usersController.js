const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config.js");
const usersController = {
  login: async (request, response, next) => {
    try {
      const { username, password } = request.body;
      console.log(request.body);
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
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.SECRET, {
        expiresIn: 60 * 60,
      });

      return response
        .status(200)
        .send({ token, username: user.username, name: user.name });
    } catch (err) {
      next(err);
    }
  },
  deleteAllUsers: async (req, res, next) => {
    try {
      const users = await User.deleteMany({});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({}).populate("createdRoutes");
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  createUser: async (req, resp, next) => {
    try {
      console.log(req.body);
      const { name, username, password } = req.body;
      const existing = await User.findOne({ username });
      console.log(existing);
      if (existing) {
        return resp.status(400).json({ error: "Username already exists" });
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      console.log(name, username, passwordHash);
      const user = new User({
        username,
        name,
        passwordHash,
        createdRoutes: [],
        joinedRoutes: [],
      });
      const savedUser = await user.save();
      resp.status(201).json(savedUser);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = usersController;
