// const JwtService = require("../services/JwtService");
// const NotiTypeService = require("../services/NotiTypeService");
const OrderAdminService = require("../services/OrderAdminService");

const getAllOrderById = async (req, res) => {
    const customerId = req.params.id;
    try{
        let data = await OrderAdminService.getAllOrderById(customerId);
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

const updateStatusOrder = async (req, res) => {
    const orderId = req.params.id;
    try{
        let data = await OrderAdminService.updateStatusOrder(orderId, req.body);
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
    getAllOrderById,
    updateStatusOrder,
};