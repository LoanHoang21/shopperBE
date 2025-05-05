const express = require("express");
const router = express.Router();
const ShipmentController = require("../controllers/ShipmentController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/addShipment', ShipmentController.createShipment);

module.exports = router;

