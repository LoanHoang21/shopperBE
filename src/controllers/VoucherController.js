// const JwtService = require("../services/JwtService");
const VoucherService = require("../services/VoucherService");

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

const createNotiOrder = async (req, res) => {
    try{
        let data = await NotiService.createNotiOrder(req.body);
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


module.exports = {
    getAllVoucher,
    createNotiOrder,
};