// const JwtService = require("../services/JwtService");
const NotiTypeService = require("../services/NotiTypeService");

const getAllNotiType = async (req, res) => {
    try{
        let data = await NotiTypeService.getAllNotiType();
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

const getQuantityNoti = async (req, res) => {
    try {
      const receiverId = req.params.id;
      const notitypeId = req.query.notitype_id || null;
      console.log("controller",receiverId,notitypeId);
  
      const data = await NotiTypeService.getQuantityNoti(receiverId, notitypeId);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: ""
      });
    }
  };
  

module.exports = {
    getAllNotiType,
    getQuantityNoti
}