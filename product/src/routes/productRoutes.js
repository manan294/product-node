const express = require("express");
 const product = require ("../controllers/productController");
const uplode = require("../config/multer");

const router = express.Router();
 
router.get("/ReadAllProducts", product.getAll);


router.get("/ReadOneProduct/:id", product.getById);


router.post("/CreateProduct", uplode.single("image"), product.createOne);


router.put("/UpdateProduct/:id", product.updateOne);


router.delete("/DeleteProduct/:id", product.deleteOne );


module.exports = router;