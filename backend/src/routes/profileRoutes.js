const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");
const {getProfile, updateProfile, updateBio} = require("../controllers/profileController.js");
const upload = require("../utils/multerConfig.js");
const router = express.Router();

router.get("/", protect(["LIBRARIAN"], ["READER"]), getProfile);
router.put("/", upload.single("profilePhoto"), protect(["LIBRARIAN", "READER"]), updateProfile);
router.put("/bio", updateBio);
// router.put("/upload-photo", upload.single("profilePhoto"), uploadProfilePhoto);

module.exports = router;
