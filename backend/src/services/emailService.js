const nodemailer = require('nodemailer');
const prisma = require('../models/prisma.js'); // Adjust the path as needed

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
 port: process.env.SMTP_PORT,
 auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Function to send email reminders
const sendEmailReminders = async () => {
  try {
    // Find books nearing their expected check-in date (within 2 days)
    const reminderDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    const overdueBooks = await prisma.checkout.findMany({
      where: {
        status: 'CHECKED_OUT',
        expectedCheckinDate: { lte: reminderDate },
      },
      include: { user: true, book: true },
    });

    for (const checkout of overdueBooks) {
      const { email } = checkout.user;
      const { title } = checkout.book;

      // Construct the email content
      const mailOptions = {
        from: 'cosyberry3@gmail.com',
        to: email,
        subject: 'Library Check-in Reminder',
        text: `Dear user, please remember to return the book "${title}" by its expected check-in date (${checkout.expectedCheckinDate}).`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${email} for book "${title}".`);
    }
  } catch (error) {
    console.error('Error sending email reminders:', error);
    throw error;
  }
};

// Function to send email reminders to librarians
const notifyLibrariansAboutOverdueBooks = async () => {
  try {
    const currentDate = new Date();
    const overdueBooks = await prisma.checkout.findMany({
      where: {
        status: 'CHECKED_OUT',
        expectedCheckinDate: { lt: currentDate },
      },
      include: { user: true, book: true },
    });

    if (overdueBooks.length === 0) {
      console.log('No overdue books found. No notifications sent.');
      return;
    }

    // Fetch all librarians
    const librarians = await prisma.user.findMany({
      where: { role: 'LIBRARIAN' }, // Adjust 'role' field as per your schema
      select: { email: true }, // Fetch only the email addresses
    });

    if (librarians.length === 0) {
      console.log('No librarians found to notify.');
      return;
    }

    // Build recipient list
    const librarianEmails = librarians.map((librarian) => librarian.email).join(', ');

    // Prepare email content
    const emailContent = overdueBooks
      .map((checkout) =>
        `Book: ${checkout.book.title}\nChecked out by: (${checkout.user.email})\nExpected Check-in Date: ${checkout.expectedCheckinDate}`
      )
      .join('\n\n');

    const mailOptions = {
      from: 'admin@library.com', // Replace with your email address
      to: librarianEmails,
      subject: 'Overdue Books Notification',
      text: `The following books are overdue:\n\n${emailContent}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to librarians: ${librarianEmails}`);
  } catch (error) {
    console.error('Error notifying librarians about overdue books:', error);
    throw error;
  }
};


module.exports = { sendEmailReminders, notifyLibrariansAboutOverdueBooks };
