const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");
const { checkOutBook, checkInBook, getCheckOutBook } = require("../controllers/checkController.js");

const router = express.Router();

// Protect routes
router.post("/checkout", protect(["READER"]), checkOutBook);
router.get("/get-checkout", protect(["READER"]), getCheckOutBook)
router.patch("/checkin/:id", protect(["READER"]), checkInBook);

module.exports = router;