// const JwtService = require("../services/JwtService");
const NotiService = require("../services/NotiService");

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
};

const createNotiVoucher = async (req, res) => {
    try{
        let data = await NotiService.createNotiVoucher(req.body);
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

const getAllNotiByReceiveId = async (req, res) => {
    const receiverId = req.query.receiver_id;
    try{
        let data = await NotiService.getAllNotiByReceiveId(receiverId);
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

const getAllNotiByNotiType = async (req, res) => {
    const receiverId = req.query.receiver_id;
    const notiTypeId = req.query.notitype_id;
    console.log(receiverId, notiTypeId);
    try{
        let data = await NotiService.getAllNotiByNotiType(receiverId, notiTypeId);
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

const updateStatusNoti = async (req, res) => {
    try {
        const notiId = req.params.id;
        let data = await NotiService.updateStatusNoti(notiId, req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }

}

const getAllNotiByAdminAndNotiType = async (req, res) => {
    // const senderId = req.params.id;
    const senderId =  req.query.sender_id;
    const notiTypeId = req.query.notitype_id;
    try{
        let data = await NotiService.getAllNotiByAdminAndNotiType(senderId, notiTypeId);
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

const getAllNotiBySenderIdAndNotiType = async (req, res) => {
    // const senderId = req.params.id;
    const senderId =  req.query.sender_id;
    const notiTypeId = req.query.notitype_id;
    try{
        let data = await NotiService.getAllNotiBySenderIdAndNotiType(senderId, notiTypeId);
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

const getNotiUpdateOrder = async (req, res) => {
    const receiverId = req.query.receiver_id;
    const notiTypeId = req.query.notitype_id;
    try{
        let data = await NotiService.getNotiUpdateOrder(receiverId, notiTypeId);
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

const getTwoNotiUpdateOrderLastest = async (req, res) => {
    const receiverId = req.query.receiver_id;
    const notiTypeId = req.query.notitype_id;
    try{
        let data = await NotiService.getTwoNotiUpdateOrderLastest(receiverId, notiTypeId);
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

const createNotiByAdmin = async (req, res) => {
    try{
        let data = await NotiService.createNotiByAdmin(req.body);
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
};

const updateNotiByAdmin = async (req, res) => {
    try{
        const notiId = req.params.id;
        let data = await NotiService.updateNotiByAdmin(notiId, req.body);
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
};

const deleteNotiByAdmin = async (req, res) => {
    try{
        const notiId = req.params.id;
        let data = await NotiService.deleteNotiByAdmin(notiId);
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
};

module.exports = {
    getAllNotiByNotiType,
    updateStatusNoti,
    createNotiOrder,
    createNotiVoucher,
    getAllNotiByReceiveId,
    getAllNotiByAdminAndNotiType,
    getAllNotiBySenderIdAndNotiType,
    getNotiUpdateOrder,
    getTwoNotiUpdateOrderLastest,
    createNotiByAdmin,
    updateNotiByAdmin,
    deleteNotiByAdmin,
};