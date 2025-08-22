const express = require("express");
const router = express.Router();
const user = require ("../controllers/userController");


 router.get("/getAllUsers", user.getAll);
 router.get("/GetOneUser/:id", user.getOne);
 router.put("/UpdateUser/:id", user.updateOne);
 router.delete("/DeleteUser/:id", user.deleteOne);

module.exports = router;