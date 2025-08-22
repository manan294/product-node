const Product = require("../models/Product");
const User = require("../models/User");
const mongoose  = require("mongoose")


const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("user","-password -__v");

  
    
    return res.status(200).json({
      data: products,
      msg: "All products",
    });
  } catch (error) {
    console.error(error);    
    return res.status(500).json({
      msg: "Internal server error ",
      error: error,
    });
  }
};


const getById = async(req,res)=>{

try { 
  // Validate
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).JSON({
      success:false,
     message: "Invalid product ID",
    });
  }

  // Find product
  const product = await product.findById(id);
   
  if (!product){
    return res.status(404).json({
       success:false,
      message: "Product not found",   
    })
  }

  // Success response
  return res.status(200).json({
    success:false,
    data:product,
    message:"Product retrieved successfully",
  })

   } catch (error) {
    console.log("Fetch by ID error",error)

  return res.status(500).json({
     success:false,
     message:"Internal server error while fetching product",
     error:error.message,
  })
}

}
 

const createOne = async (req, res) => {
  try {
    const user_id = req.user.id;

  
    let imagePath = "";
    if (req.file) {
      imagePath = "/products/" + req.file.filename; 
    }

    
    const {
    name,
    price,
    ratting,
    catagory,
    subcategory,
    discount,
    discount_data,
    desc,
    } = req.body;

  
    if (!name || price === undefined || !catagory || !subcategory || !color || color.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, price, category, subcategory, and at least one color are required.",
      });
    }


    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Cannot create product.",
      });
    }


    const newProduct = await Product.create({
    name,
    price,
    ratting,
    catagory,
    subcategory,
    discount,
    discount_data,
    desc,
    });

    
    user.product.push(newProduct.id);
    await user.save();

    
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });

  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};



const updateOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const product = await Product.findById(id);
    if (!product) return res.json({ msg: "Product not found" });
    
    const { productname, price, desc } = req.body;

    await Product.findOneAndUpdate(
      { _id: id },
      
      { productname, price, desc }
    );

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "failed to update" });
  }
};



const deleteOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: `Product deleted successfully, ${JSON.stringify(result)}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { getAll, getById , createOne, updateOne, deleteOne };
