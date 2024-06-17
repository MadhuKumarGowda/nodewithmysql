const express = require("express");
const authController = require("../controllers/authController");
const constant = require("../utils/constant");

const authRouter = express.Router();

authRouter.route(constant.registerURL).post(authController.userRegister);
authRouter.route(constant.loginURL).post(authController.userLogin);
authRouter.route(constant.logoutURL).post(authController.logoutURL);

module.exports = authRouter;