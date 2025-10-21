const usersRouter = require("express").Router();
const usersController = require("../controllers/usersController.js");
usersRouter.get("/", usersController.getAllUsers);
usersRouter.post("/", usersController.registerUser);
usersRouter.get("/delete", usersController.deleteAllUsers);
usersRouter.delete("/delete/:id", usersController.deleteUserById);
usersRouter.get("/:id", usersController.getUserById);

module.exports = usersRouter;
