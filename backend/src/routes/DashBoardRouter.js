const express = require("express");
const dashBoardController = require("../controllers/DashBoardController");

const router = express.Router(); 

router.get("/count", dashBoardController.getDashboardStats);
router.get("/latest", dashBoardController.getLatest); 

module.exports = router; 

