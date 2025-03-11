const express = require("express");
const upload = require("../utils/multerConfig.js");
const { protect } = require("../middlewares/authMiddleware.js");
const { addBook, updateBook, searchBooks, getAllBooks } = require("../controllers/bookController.js");

const router = express.Router();

// Protected routes
router.post("/addBook", protect(["LIBRARIAN"]), upload.single("bookPhoto"), addBook); // Librarian-only
router.put("/updateBook/:id", protect(["LIBRARIAN"]), updateBook); // Librarian-only
// Public routes
router.get("/searchBooks", searchBooks);
router.get("/getAllBooks", getAllBooks)

module.exports = router;
