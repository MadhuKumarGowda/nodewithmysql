const express = require("express");
const fileReaderController = require("../controllers/readxlsxController");
const constant = require("../utils/constant");
const fileReaderRouter = express.Router();

fileReaderRouter.route(constant.readXlsx).get(fileReaderController.readXlsxconvertJson)

module.exports = fileReaderRouter;