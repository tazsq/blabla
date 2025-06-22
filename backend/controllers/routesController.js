const Route = require("../models/route.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");
const usersController = require("./usersController.js");

// const routes = [
//   {
//     from: "mumbai",
//     to: "pune",
//   },
//   {
//     from: "rajp",
//     to: "mumbai",
//   },
//   {
//     from: "pune",
//     to: "rajp",
//   },
//   {
//     from: "nashik",
//     to: "nagpur",
//   },
// ];
const routesController = {
  get: async (req, res, next) => {
    try {
      const routes = await Route.find({}).populate("driver", {
        name: 1,
        username: 1,
      });
      res.status(200).json(routes);
      console.log("data provided to response");
    } catch (err) {
      console.log("cannot find routes");
      next(err); // or: res.status(500).json({ error: "Failed to fetch routes" });
    }
  },

  post: async (req, res, next) => {
    try {
      console.log(req.token, "----------------------------");
      if (!req.token) {
        return res.status(401).json({ error: "token not provided" });
      }
      const decodedToken = jwt.verify(req.token, config.SECRET);
      console.log(decodedToken);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
      const user = await User.findById(decodedToken.id);
      // const user = await User.findById(req.body.driver);
      if (!user) {
        return res.status(400).json({ error: "userId missing or not valid" });
      }
      const route = new Route({
        from: req.body.from,
        to: req.body.to,
        driver: user.id,
        passengers: [],
      });
      const savedRoute = await route.save();
      user.createdRoutes.push(savedRoute.id);
      await user.save();
      return res.status(201).json({
        message: "Route created successfully",
        data: savedRoute,
      });
    } catch (err) {
      console.log("catch block trigger");
      next(err);
    }
  },
  deleteAll: async (req, res, next) => {
    try {
      const result = await Route.deleteMany({});
      console.log("deleted~");
      res.status(200).json(result);
    } catch (err) {
      console.log("cannot delete");
      next(err);
    }
  },

  // example: async (req, res) => {
  //   try {
  //     const promises = routes.map((r) => {
  //       const route = new Route(r);
  //       return route.save();
  //     });
  //     const savedRoutes = await Promise.all(promises);
  //     res.json(savedRoutes);
  //     console.log("routes saved to DB successfully");
  //   } catch (error) {
  //     console.log(`${error.message} not stored on DB`);
  //   }
  // },
  getRouteById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const route = await Route.findById(id);
      if (route) {
        res.json(route);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(401).json({ error: "token not provided" });
      }
      const decodedToken = jwt.verify(req.token, config.SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
      const user = await User.findById(decodedToken.id);
      // const user = await User.findById(req.body.driver);

      if (!user) {
        return res.status(400).json({ error: "userId missing or not valid" });
      }
      console.log(user);
      const id = req.params.id;
      const route = await Route.findByIdAndDelete(id);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }
      user.createdRoutes = user.createdRoutes.filter(
        (r) => r.toString() !== id
      );
      await user.save();
      console.log("Updated user:", user);
      return res.status(204).json(route); //204-ignores any data sent afetrwards ,200-sends deleted data
    } catch (err) {
      next(err);
    }
  },
  updateById: async (req, res, next) => {
    const { from, to } = req.body;
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).end();
      }
      route.from = from;
      route.to = to;
      const savedRoute = await route.save();
      return res.status(200).json(savedRoute);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = routesController;
