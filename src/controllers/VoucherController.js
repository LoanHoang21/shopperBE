// const JwtService = require("../services/JwtService");
const VoucherService = require("../services/VoucherService");
const Voucher = require('../models/VoucherModel');

const mongoose = require('mongoose');
const getAllVoucher = async (req, res) => {
    try{
        let data = await VoucherService.getAllVoucher();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const getVouchersByShop = async (req, res) => {
    try {
        const { shopId } = req.params;

        const objectId = new mongoose.Types.ObjectId(shopId);  // ✅ ép đúng kiểu

        const vouchers = await Voucher.find({
            type: 'Shop',
            shopId: objectId
        });

        res.status(200).json({ status: 'OK', data: vouchers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllVoucher,
    createNotiOrder,
    getVouchersByShop
};