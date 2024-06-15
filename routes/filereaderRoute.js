const express = require("express");
const fileReaderController = require("../controllers/readxlsxController");
const fileReaderRouter = express.Router();

fileReaderRouter.route("/xlsxData")
.get(fileReaderController.readXlsxconvertJson)

module.exports = fileReaderRouter;