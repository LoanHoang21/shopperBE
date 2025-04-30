const express = require("express");
const router = express.Router();
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const NotiController = require('../controllers/NotiController');

router.get('/getAllNotiByNotiType/:id',NotiController.getAllNotiByNotiType);
router.get('/getAllNotiByReceiveId/:id',NotiController.getAllNotiByReceiveId);
router.post('/updateStatusNoti/:id', NotiController.updateStatusNoti);
router.post('/createNotiOrder', NotiController.createNotiOrder);
router.post('/createNotiVoucher', NotiController.createNotiVoucher);

module.exports = router;

