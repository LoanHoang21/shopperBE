const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/AddressController");

router.post("/", AddressController.createOrUpdateAddress);
router.get("/:customer_id", AddressController.getAddressByCustomerId);

module.exports = router;    