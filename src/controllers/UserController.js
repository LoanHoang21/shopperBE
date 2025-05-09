const UserService = require('../services/UserService');

const getAllUser = async (req, res) => {
    try{
        let data = await UserService.getAllUser();
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

// const createUser = async (req, res) => {
//     try{
//         let users = await UserService.getAllList();
//         return res.status(StatusCodes.OK).json({
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

// const updateUser = async (req, res) => {
//     try{
//         let users = await UserService.getAllList();
//         return res.status(StatusCodes.OK).json({
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

// const deleteUser = async (req, res) => {
//     try{
//         let users = await UserService.getAllList();
//         return res.status(StatusCodes.OK).json({
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

// module.exports = {
//     getAllList,
//     createUser,
//     updateUser,
//     deleteUser,
// }

const updateFcmToken = async (req, res) => {
    try {
        const userId = req.params.id;
        let data = await UserService.updateFcmToken(userId, req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        let data = await UserService.getDetailUser(userId);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const updateSettingNoti = async (req, res) => {
    try {
        const userId = req.params.id;
        // const settingNotiId = req.query.setting_noti_id;
        let data = await UserService.updateSettingNoti(userId, req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(e);
        return res.status(500).json({ 
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

module.exports = {
    getAllUser,
    updateFcmToken,
    getDetailUser,
    updateSettingNoti,
};