const express = require("express");
const router = express.Router();
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");
const NotiController = require('../controllers/NotiController');

router.get('/getAllNotiByNotiType/:id',NotiController.getAllNotiByNotiType);
router.get('/getAllNotiByReceiveId/:id',NotiController.getAllNotiByReceiveId);
router.post('/updateStatusNoti/:id', NotiController.updateStatusNoti);
router.post('/createNotiOrder', NotiController.createNotiOrder);
router.post('/createNotiVoucher', NotiController.createNotiVoucher);
router.get('/getAllNotiBySenderIdAndNotiType/:id', NotiController.getAllNotiBySenderIdAndNotiType);
router.get('/getNotiUpdateOrder/:id',NotiController.getNotiUpdateOrder);
router.get('/getTwoNotiUpdateOrderLastest/:id',NotiController.getTwoNotiUpdateOrderLastest);
router.get('/getAllNotiByNotiType/:id',NotiController.getAllNotiByNotiType);
router.post('/createNotiByAdmin', NotiController.createNotiByAdmin);
router.post('/updateNotiByAdmin/:id', NotiController.updateNotiByAdmin);
router.post('/deleteNotiByAdmin/:id', NotiController.deleteNotiByAdmin);

module.exports = router;

