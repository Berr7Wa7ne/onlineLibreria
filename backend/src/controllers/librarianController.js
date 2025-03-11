const prisma = require("../models/prisma");
const { sendEmailReminders, notifyLibrariansAboutOverdueBooks } = require('../services/emailService');

// Controller to fetch a list of overdue books
const viewOverdueBooks = async (req, res) => {
    console.log("Fetching overdue books...");

    try {
        const currentDate = new Date();
        console.log("Current date:", currentDate);

        // Query the database to find books that are overdue
        const overdueBooks = await prisma.checkout.findMany({
            where: {
                status: "CHECKED_OUT", // Only include books currently checked out
                expectedCheckinDate: { lt: currentDate }, // Check if the expected check-in date is past
            },
            select: {
                id: true, // Include the checkout record ID
                checkoutDate: true, // Include the checkout date
                expectedCheckinDate: true, // Include the expected check-in date
                user: { // Include details about the user who checked out the book
                    select: {
                        id: true,
                        email: true,
                    },
                },
                book: { // Include details about the book
                    select: {
                        id: true,
                        title: true,
                        isbn: true,
                    },
                },
            },
        });

        // Calculate the number of overdue days for each book
        const booksWithOverdueDays = overdueBooks.map(book => ({
            ...book,
            overdueDays: Math.floor((currentDate - new Date(book.expectedCheckinDate)) / (1000 * 60 * 60 * 24)), // Convert milliseconds to days
        }));

        console.log("Overdue books fetched successfully:", booksWithOverdueDays);

        // Send the list of overdue books with additional details in the response
        res.status(200).json(booksWithOverdueDays);
    } catch (error) {
        console.error("Error fetching overdue books:", error.message);

        // Handle unexpected errors with a generic message
        res.status(500).json({ error: "Failed to fetch overdue books" });
    }
};

// Controller to trigger email reminders to users with overdue books
const triggerEmailReminders = async (req, res) => {
    try {
        console.log("Sending email reminders to users with overdue books...");
        
        // Call the email service to send reminders
        await sendEmailReminders();

        console.log("Email reminders sent successfully.");
        res.status(200).json({ message: 'Email reminders sent successfully.' });
    } catch (error) {
        console.error('Error triggering email reminders:', error.message);

        // Handle errors during email sending
        res.status(500).json({ error: 'Failed to send email reminders.' });
    }
};

// Controller to notify librarians about overdue books
const triggerOverdueNotificationToLibrarian = async (req, res) => {
    try {
        console.log("Notifying librarians about overdue books...");

        // Call the email service to send notifications to librarians
        await notifyLibrariansAboutOverdueBooks();

        console.log("Overdue notification sent to librarians successfully.");
        res.status(200).json({ message: 'Overdue notification sent to librarian.' });
    } catch (error) {
        console.error('Error notifying librarian about overdue books:', error.message);

        // Handle errors during librarian notification
        res.status(500).json({ error: 'Failed to notify librarian.' });
    }
};

// Export the controllers for use in routes
module.exports = {
    viewOverdueBooks,
    triggerEmailReminders,
    triggerOverdueNotificationToLibrarian,
};
