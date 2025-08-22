const express = require("express");
const product = require ("../controllers/productController");
const { authUser } = require("../middleware/authUser");
const uplode = require("../config/multer");

const router = express.Router();

//1.read All
router.get("/ReadAllProducts", authUser, product.getAll);

//2.read One
router.get("/ReadOneProduct/:id", authUser, product.getById);

// 3.create
router.post("/CreateProduct", authUser, uplode.single("image"), product.createOne);

//4.update
router.put("/UpdateProduct/:id", authUser, product.updateOne);

//5.delete
router.delete("/DeleteProduct/:id", product.deleteOne );


module.exports = router;