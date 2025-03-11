const express = require("express");
const upload = require("../utils/multerConfig");
const { register, login, createLibrarian } = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Public routes
router.post("/register", upload.single("profilePhoto"), register);
router.post("/login", login);

// Protected routes
router.post("/create-librarian", upload.single("profilePhoto"), protect(["SUPERADMIN"]), createLibrarian);

module.exports = router;
