const loginRouter = require("express").Router();
const usersController = require("../controllers/usersController");
loginRouter.post("/", usersController.login);

module.exports = loginRouter;
