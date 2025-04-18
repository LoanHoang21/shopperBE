const UserService = require('../services/UserService');

const getAllList = async (req, res) => {
    try{
        let data = await UserService.getAllList();
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

const createUser = async (req, res) => {
    try{
        let users = await UserService.getAllList();
        return res.status(StatusCodes.OK).json({
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

const updateUser = async (req, res) => {
    try{
        let users = await UserService.getAllList();
        return res.status(StatusCodes.OK).json({
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

const deleteUser = async (req, res) => {
    try{
        let users = await UserService.getAllList();
        return res.status(StatusCodes.OK).json({
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
    getAllList,
    createUser,
    updateUser,
    deleteUser,
}