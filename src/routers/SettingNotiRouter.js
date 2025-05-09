const express = require("express");
const router = express.Router();
const SettingNotiController = require("../controllers/SettingNotiController");

router.get('/getAllSettingNotiByStatus', SettingNotiController.getAllSettingNotiByStatus)
router.get('/getAllSettingNoti', SettingNotiController.getAllSettingNoti)
router.get('/getSettingNotiById/:id', SettingNotiController.getSettingNotiById)

module.exports = router;