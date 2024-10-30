const express = require("express");
const { authController } = require("../../controllers");

const authRouter = express.Router();

// Route for user authentication (signup/login)
authRouter.post("/login", authController.authController);

module.exports = authRouter;
