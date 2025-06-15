const Route = require("../models/route.js");
const routes = [
  {
    from: "mumbai",
    to: "pune",
  },
  {
    from: "rajp",
    to: "mumbai",
  },
  {
    from: "pune",
    to: "rajp",
  },
  {
    from: "nashik",
    to: "nagpur",
  },
];
const routesController = {
  get: async (req, res) => {
    Route.find({})
      .then((routes) => {
        res.json(routes);
        console.log("data provided to response");
      })
      .catch((err) => {
        console.log("cannot find routes");
        res.json(err);
      });
  },
  post: async (req, res, next) => {
    try {
      const route = new Route(req.body);
      const savedRoute = await route.save();

      res.status(201).json({
        message: "Route created successfully",
        data: savedRoute,
      });

      console.log("data saved");
    } catch (err) {
      next(err);
    }
  },
  deleteAll: async (req, res) => {
    Route.deleteMany({})
      .then((routes) => {
        res.json(routes);
        console.log("deleted~");
      })
      .catch((err) => {
        console.log("cannot delete");
        res.json(err);
      });
  },
  example: async (req, res) => {
    try {
      const promises = routes.map((r) => {
        const route = new Route(r);
        return route.save();
      });
      const savedRoutes = await Promise.all(promises);
      res.json(savedRoutes);
      console.log("routes saved to DB successfully");
    } catch (error) {
      console.log(`${error.message} not stored on DB`);
    }
  },
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
    const id = req.params.id;
    try {
      const route = await Route.findByIdAndDelete(id);
      console.log(route);
      res.status(204).end(); //204-ignores any data sent afetrwards ,200-sends deleted data
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
