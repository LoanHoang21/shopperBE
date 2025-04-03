const ProductService = require("../services/ProductService");
const JwtService = require("../services/JwtService");

function isNumeric(value) {
  return Number.isFinite(Number(value)) && Number(value) >=0;
}

function isDiscount(value) {
  return Number(value) <=99;
}

const createProduct = async (req, res) => {
  try {
     const {name,image, type, countinstock, description,discount,selled,cpu,screen,ram,memory} = req.body;

    if(!name || !image || !memory || !type || !countinstock  || !discount || !selled || !cpu || !screen || !ram){
        return res.status(200).json({
            status: "ERR",
            message: "Vui lòng nhập đủ thông tin"
        })
    }

    if (!isNumeric(countinstock) || !isNumeric(discount) || !isNumeric(selled) || !isNumeric(screen) || !isNumeric(ram) || !isNumeric(memory)) {
      return res.status(200).json({
        status: "ERR",
        message: "Vui lòng nhập đúng kiểu dữ liệu"
      });
    }
 
    if(!isDiscount(discount)){
      return res.status(200).json({
        status: "ERR",
        message: "Discount phải dưới 99"
      });
    }

    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
    
  }
};

const updateProduct = async (req,res)=>{
  try{
      const productId = req.params.id;
      const data = req.body;
      const {name,image,type, countinstock,description,discount,selled,cpu,screen,ram,memory} = req.body;

      if(!productId){
          return res.status(200).json({
              status: "ERR",
              message: "The productId is required"
          })
      }

      if(!name || !image || !memory || !type || !countinstock  || !discount || !selled || !cpu || !screen || !ram){
        return res.status(200).json({
            status: "ERR",
            message: "Vui lòng nhập đủ thông tin"
        })
    }

      if (!isNumeric(countinstock) || !isNumeric(discount) || !isNumeric(selled) || !isNumeric(screen) || !isNumeric(ram) || !isNumeric(memory)) {
        return res.status(200).json({
          status: "ERR",
          message: "Vui lòng nhập đúng kiểu dữ liệu"
        });
      }
  
      if(!isDiscount(discount)){
        return res.status(200).json({
          status: "ERR",
          message: "Discount phải dưới 99"
        });
      }

      const response = await ProductService.updateProduct(productId,data);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getDetailsProduct = async (req,res)=>{
  try{
      const productId = req.params.id; 

      if(!productId){
          return res.status(200).json({
              status: "ERR",
              message: "The userId is required"
          })
      }

      const response = await ProductService.getDetailProduct(productId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const deleteProduct = async (req,res)=>{
  try{
      const productId = req.params.id;

      if(!productId){
          return res.status(200).json({
              status: "ERR",
              message: "The productId is required"
          })
      }

      const response = await ProductService.deleteProduct(productId);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getAllProduct = async (req,res)=>{
  try{
     const {limit,page,sort,filter} = req.query;
     
      const response = await ProductService.getAllProduct(Number(limit) || 1000,Number(page) || 0 ,sort,filter);
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

const getAllProductFilter = async (req,res)=>{
  try{
     const valueFilter = req.query;
      const response = await ProductService.getAllProductFilter(valueFilter);
      // const response = await ProductService.getAllProduct();
      return res.status(200).json(response);
  }catch(e){
      return res.status(404).json({message:e})
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getAllProductFilter
};
