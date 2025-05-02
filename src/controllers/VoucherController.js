const Voucher = require('../models/VoucherModel');
const mongoose = require('mongoose');
const VoucherController = {
    createVoucher: async (req, res) => {
        try {
            const { shopId, ...voucherData } = req.body;
            if (shopId) {
                voucherData.shopId = shopId;
                voucherData.type = 'Shop'; // optional: nếu muốn đánh dấu đây là voucher của shop
            }
            const newVoucher = new Voucher(voucherData);
            const savedVoucher = await newVoucher.save();
            res.status(201).json(savedVoucher);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    getAllVouchers: async (req, res) => {
        try {
            const vouchers = await Voucher.find().populate('shopId', 'name');
            res.status(200).json(vouchers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getVoucherById: async (req, res) => {
        try {
            const voucher = await Voucher.findById(req.params.id);
            if (!voucher) return res.status(404).json({ message: 'Voucher not found' });
            res.status(200).json(voucher);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getVouchersByShop: async (req, res) => {
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
   , 

    updateVoucher: async (req, res) => {
        try {
            const updatedVoucher = await Voucher.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedVoucher);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteVoucher: async (req, res) => {
        try {
            await Voucher.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Voucher deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = VoucherController;
