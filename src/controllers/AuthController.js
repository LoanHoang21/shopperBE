const { StatusCodes } = require('http-status-codes');

const ProductService = require("../services/ProductService");
const AuthService = require("../services/AuthService");

const register = async (req, res) => {
  try {
    const response = await AuthService.register(req.body);
    return res.status(StatusCodes.OK).json({
      EM: response.EM,
      EC: response.EC, // error code
      DT: '', // data
    });
  } catch (e) {
    console.log('Lỗi', e);
    return res.status(404).json({ message: e });
    
  }
};

const login = async (req, res) => {
  try {
    const response = await AuthService.login(req.body);
    return res.status(StatusCodes.OK).json({
      EM: response.EM,
      EC: response.EC, // error code
      DT: response.DT, // data
    });
  } catch (e) {
    console.log('Lỗi', e);
    return res.status(404).json({ message: e }); 
  }
};

const logout = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await AuthService.logout(userId);
    return res.status(200).json({
      EM: response.EM,
      EC: response.EC, // error code
      DT: response.DT, // data
    });
  } catch (e) {
    console.log('Lỗi', e);
    return res.status(404).json({ message: e }); 
  }
}

module.exports = {
  register,
  login,
  logout,
};
