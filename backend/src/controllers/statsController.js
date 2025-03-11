const prisma = require("../models/prisma.js");

const getLibraryStats = async (req, res) => {
    try {
      // Total number of books
      const totalBooks = await prisma.book.count();
      console.log('This is the total books', totalBooks)
  
      // Total books currently borrowed (not returned)
      const checkedOutBooks = await prisma.checkout.count({
        where: {
          status: "CHECKED_OUT", // Use enum value
        },
      });
      console.log('This is the total checked out books', checkedOutBooks)
  
      // Total overdue books
      const overdueBooks = await prisma.checkout.count({
        where: {
          status: "OVERDUE", // Use enum value
        },
      });
      console.log('This is the total overdue books', overdueBooks)
  
      // Total registered users
      const totalUsers = await prisma.user.count();
      console.log('This is the total users', totalUsers)
  
      // Send response
      res.json({
        totalBooks,
        checkedOutBooks,
        overdueBooks,
        totalUsers,
      });
    } catch (error) {
      console.error('Error fetching library stats:', error);
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  };
  
  module.exports = { getLibraryStats };