const authRouter = require("express").Router();
const authController = require("../controllers/authController");
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/verify", authController.verify);
authRouter.post("/logout", authController.logout);
module.exports = authRouter;
