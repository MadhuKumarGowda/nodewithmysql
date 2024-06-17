const express = require('express');
const dashbaordController = require("../controllers/dashbaordController");
const constant = require("../utils/constant");
const router = express.Router();

router.route(constant.getDefectData).get(dashbaordController.getDefectList);

module.exports = router;
