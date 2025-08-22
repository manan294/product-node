const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// create User
router.post("/register", authController.register);

// login User
router.post("/login", authController.login);

// logout User
router.post("/logout", authController.logout);

// User profile
router.post("/profile", authController.profile);

module.exports = router;