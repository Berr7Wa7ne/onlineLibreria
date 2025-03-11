const express = require("express");
const  { protect } = require("../middlewares/authMiddleware.js");
const { viewOverdueBooks, triggerEmailReminders, triggerOverdueNotificationToLibrarian } = require("../controllers/librarianController.js");



const router = express.Router();


// Librarian Protected route to view overdue books
router.get("/overdue", protect(["LIBRARIAN", "SUPERADMIN"]), viewOverdueBooks);
// Librarian Protected route to Notify users about upcoming due dates
router.post('/send-reminders', protect(['LIBRARIAN']), triggerEmailReminders);
// Superadmin Protected route to Notify librarians about overdue books
router.post('/notify-librarian', protect(['SUPERADMIN']), triggerOverdueNotificationToLibrarian);

module.exports = router;
