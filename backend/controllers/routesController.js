const Route = require("../models/route.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");

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
  getAllRides: async (req, res, next) => {
    try {
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
      const routes = await Route.find({}).populate("driver", {
        name: 1,
        username: 1,
      });
      return res.status(200).json(routes);
      console.log("data provided to response");
    } catch (error) {
      next(error);
      console.log(error);
    }
  },
  get: async (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(401).json({ error: "token not provided" });
      }
      const decodedToken = jwt.verify(req.token, config.ACCESS_TOKEN_SECRET);
      console.log(decodedToken);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
      const user = await User.findById(decodedToken.id);
      // const user = await User.findById(req.body.driver);
      if (!user) {
        return res.status(400).json({ error: "userId missing or not valid" });
      }
      const {
        from,
        to,
        date,
        passengersRequired: passengerCapacity,
        filter: queryFilter,
      } = req.query;
      if (!from || !to)
        return res
          .status(400)
          .json({ err: "from and to fields should be defined" });
      const filter = {};
      filter.from = from.toLowerCase();
      filter.to = to.toLowerCase();
      if (date !== "") {
        const dateStart = new Date(date);
        const dateEnd = new Date(dateStart);
        dateEnd.setDate(dateEnd.getDate() + 1);
        filter.date = { $gte: dateStart, $lt: dateEnd };
      }
      if (passengerCapacity !== "") {
        filter.passengerCapacity = passengerCapacity;
      }
      filter.$expr = {
        $and: [
          { $lt: [{ $size: "$passengers" }, "$passengerCapacity"] },
          // {
          //   $gt: ["$date", new Date()],
          // },
        ],
      };
      // if (queryFilter !== "") {
      //   if (queryFilter === "availableOnly") {
      //     filter.$expr = {
      //       $lt: [{ $size: "$passengers" }, "$passengerCapacity"],
      //     };
      //   }
      // }
      const routes = await Route.find(filter).populate("driver", {
        name: 1,
        username: 1,
        createdRoutes: 1,
      });
      console.log(routes);
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
        from: req.body.from.toLowerCase(),
        to: req.body.to.toLowerCase(),
        passengerCapacity: req.body.passengerCapacity,
        driver: user.id,
        date: req.body.date,
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
    const { from, to, date, passengerCapacity } = req.body;
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).end();
      }
      route.from = from;
      route.to = to;
      route.date = date;
      route.passengerCapacity = passengerCapacity;
      const savedRoute = await route.save();
      return res.status(200).json(savedRoute);
    } catch (err) {
      next(err);
    }
  },
  book: async (req, res, next) => {
    try {
      //validate token
      if (!req.token) {
        return res.status(401).json({ error: "token not provided" });
      }
      const decodedToken = jwt.verify(req.token, config.SECRET);
      console.log(decodedToken);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(400).json({ error: "userId missing or not valid" });
      }
      //push route id to user joinedRoutes array
      //push user id to route passengers array
      if (!req.body) return res.status(400).json({ error: "no req body" });
      // const route = new Route({
      //   from: req.body.from.toLowerCase(),
      //   to: req.body.to.toLowerCase(),
      //   passengerCapacity: req.body.passengerCapacity,
      //   driver: user.id,
      //   date: req.body.date,
      //   passengers: [],
      // });
      const route = await Route.findById(req.body.id);
      if (!route)
        return res.status(404).json({ error: "no route found by given id" });
      if (route.passengers.length >= route.passengerCapacity) {
        return res.status(400).json({ error: "this ride is full;)" });
      }
      user.joinedRoutes.push(req.body.id);
      route.passengers.push(user.id);

      const newUser = await user.save();
      const newRoute = await route.save();
      return res.status(200).json({ savedUser: newUser, savedRoute: newRoute });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = routesController;
