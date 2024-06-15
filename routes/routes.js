const express = require('express');
const dashbaordController = require("../controllers/dashbaordController");
const router = express.Router();

router.route('/getDefectData')
.get(dashbaordController.getDefectList);

module.exports = router;
