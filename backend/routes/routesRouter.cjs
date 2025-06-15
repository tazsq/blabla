const express = require("express");
const routesRouter = express.Router();
const routesController = require("../controllers/routesController.cjs");
// const Route = require("../models/route.js");

// routesRouter.get("/", (req, res) => {
//   routesController.get(req, res);
// });
routesRouter.get("/", routesController.get);
routesRouter.post("/", routesController.post);
routesRouter.get("/delete", routesController.deleteAll);
routesRouter.get("/exp", routesController.example);
routesRouter.get("/:id", routesController.getRouteById);
routesRouter.delete("/:id", routesController.deleteById);
routesRouter.put("/:id", routesController.updateById);

module.exports = routesRouter;
