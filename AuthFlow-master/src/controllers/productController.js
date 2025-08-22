const Product = require("../models/Product");
const User = require("../models/User");
const mongoose  = require("mongoose")

// Get all products
const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("user","-password -__v");

    // console.log("Session data:", req.session.data);
    // if (req.session?.data) {
    //   req.session.data = req.session.data + 1;
    // } else {
    //   req.session.data = 1;
    // }
    
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
  // Validate ObjectId
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).JSON({
      success:false,
     message: "Invalid product ID format",
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

// const createOne = async (req, res) => {
//   try {
//     //  ratting, category, disconnect, createdAt, color'
    
//     const user_id = req.user.id;


//     let imagePath = "";
//     if(req.file){
//     imagePath = "/products" + req.file.filename;
//     }

    
//     const { productname, price, desc } = req.body;

//     if (!productname || !price ) {
//       return res
//         .status(400)
//         .json({ msg: "Please provide all required fields" });
//     }
//     // ratting, category, disconnect, createdAt, color
//     const product = await Product.create({ productname, price, desc });
//     res.status(201).json({ msg: "Product created", data: product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };



// Update one product

const createOne = async (req, res) => {
  try {
    const user_id = req.user.id;

    // ✅ Image handling (from multer)
    let imagePath = "";
    if (req.file) {
      imagePath = "/products/" + req.file.filename; // store relative path only
    }

    // ✅ Destructure body fields
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

    // ✅ Manual validation
    if (!name || price === undefined || !catagory || !subcategory || !color || color.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, price, category, subcategory, and at least one color are required.",
      });
    }

    // ✅ Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Cannot create product.",
      });
    }

    // ✅ Create new product
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

    // ✅ Link product to user
    user.product.push(newProduct.id);
    await user.save();

    // ✅ Success response
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

// update one product

const updateOne = async (req, res) => {
  try {
    const id = req.params["id"];
    const product = await Product.findById(id);
    if (!product) return res.json({ msg: "Product not found" });
    // , ratting, category, disconnect, createdAt, color
    const { productname, price, desc } = req.body;

    await Product.findOneAndUpdate(
      { _id: id },
      // , ratting, category, disconnect, createdAt, color
      { productname, price, desc }
    );

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "failed to update" });
  }
};

// Delete one product

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
