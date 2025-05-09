// const JwtService = require("../services/JwtService");
const SettingNotiService = require("../services/SettingNotiService");

const getAllSettingNotiByStatus = async (req, res) => {
    const value = req.query.status;
    try{
        let data = await SettingNotiService.getAllSettingNotiByStatus(value);
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

const getAllSettingNoti = async (req, res) => {
    try{
        let data = await SettingNotiService.getAllSettingNoti();
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

const getSettingNotiById = async (req, res) => {
    const settingNotiId = req.params.id;
    try{
        let data = await SettingNotiService.getSettingNotiById(settingNotiId);
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
    getAllSettingNotiByStatus,
    getAllSettingNoti,
    getSettingNotiById,
};