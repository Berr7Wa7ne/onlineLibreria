const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module
const cron = require('node-cron');
const { sendEmailReminders } = require('./services/emailService.js');
const { triggerOverdueNotificationToLibrarian} = require('./controllers/librarianController.js');
const authRoutes = require("./routes/authRoutes.js");
const bookRoutes = require("./routes/bookRoutes");
const checkRoutes = require("./routes/checkRoutes.js")
const librarianRoutes = require("./routes/librarianRoutes.js");
const statsRoutes = require("./routes/statsRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");

const app = express();

// Schedule the email reminders to run daily at 8 AM
cron.schedule('0 8 * * *', async () => {
    console.log('Running daily email reminders task...');
    await sendEmailReminders();
  });

  // Schedule the email reminders to Librarians to run daily at 11:59PM every day
  cron.schedule('59 23 * * *', async () => {
    await triggerOverdueNotificationToLibrarian();
  });

  app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://newonlinelibreria.netlify.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Increase URL-encoded limit

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRoutes);
app.use("/book", bookRoutes)
app.use("/check", checkRoutes)
app.use("/librarian", librarianRoutes, statsRoutes);
app.use("/profile", profileRoutes);

module.exports = app;
