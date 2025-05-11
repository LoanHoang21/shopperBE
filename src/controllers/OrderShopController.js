// const JwtService = require("../services/JwtService");
const OrderShopService = require("../services/OrderShopService");

const getAllOrderById = async (req, res) => {
    const customerId = req.query.customer_id;
    try{
        let data = await OrderShopService.getAllOrderById(customerId);
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
        let data = await OrderShopService.updateStatusOrder(orderId, req.body);
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

const getAllOrder = async (req, res) => {
    const shopId = req.query.shop_id;
    try{
        let data = await OrderShopService.getAllOrder(shopId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
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

const getAllCustomer = async (req, res) => {
    const shopId = req.query.shop_id;
    try{
        let data = await OrderShopService.getAllCustomer(shopId);
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

// const getAllProduct = async (req, res) => {
//     const shopId = req.query.shop_id;
//     try{
//         let data = await OrderShopService.getAllProduct(shopId);
//         return res.status(200).json({
//             EM: data.EM, // error message
//             EC: data.EC, // error code
//             DT: data.DT, // data
//         });
//     }catch(e){
//         console.log(e);
//         return res.status(500).json({ 
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

module.exports = {
    getAllOrderById,
    updateStatusOrder,
    getAllOrder,
    getAllCustomer,
    // getAllProduct,
};