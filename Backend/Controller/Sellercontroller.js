

import jwt from "jsonwebtoken";
import ProductModal from "../Modal/Product.modal.js";

export const addProduct = async (req , res)=>{
    try {
        const { name, price, category, image , token} = req.body
    
        if (!name || !price || !category || !image || !token)
          return res.json({ success: false, message: "all fields aree mandatory" });
        const decodededData = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodededData ){
            return res.json({ success: false, message: "token not valid" });
        }

        const userId = decodededData?.userId
        const Product = new ProductModal({name, price, category, image , userId:userId})
    
    await Product.save()
        return res.json({
          success: true,
          message: "product added succesfully",
          Product:Product
        });
      } catch (error) {
        return res.json({ success: false, message: error });
      }

}