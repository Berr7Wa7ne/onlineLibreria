const prisma = require("../models/prisma.js");

// Function to handle book checkout
const checkOutBook = async (req, res) => {
    try {
        const { bookId, expectedCheckinDate } = req.body;
        const userId = req.user.id;

        console.log("Checkout request received:", { userId, bookId, expectedCheckinDate });

        // Check if this specific book is already checked out
        const activeCheckout = await prisma.checkout.findFirst({
            where: { bookId, status: 'CHECKED_OUT' },
        });

        if (activeCheckout) {
            return res.status(400).json({ error: "Book is already checked out" });
        }

        // Fetch book details
        const book = await prisma.book.findUnique({
            where: { id: bookId },
            select: { id: true, title: true, authors: true, genre: true }, // Select necessary fields
        });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Create checkout record
        const checkout = await prisma.checkout.create({
            data: {
                userId,
                bookId,
                expectedCheckinDate: new Date(expectedCheckinDate),
            },
        });

        console.log("Book checked out successfully:", checkout);

        // ✅ Log all checkouts for this user
        const allUserCheckouts = await prisma.checkout.findMany({
            where: { userId },
        });
        console.log("All checkouts for user:", allUserCheckouts);

        res.status(201).json({ 
            message: "Book checked out successfully", 
            checkout, 
            book, 
            allCheckouts: allUserCheckouts // Send back all checkouts for debugging
        });
    } catch (error) {
        console.error("Error checking out book:", error.message);
        res.status(500).json({ error: "Failed to check out book" });
    }
};


// Assuming you use Prisma with a direct relationship
const getCheckOutBook = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming the user ID is decoded from the JWT token
  
      // Fetch the user's checkouts with the related book data using the `include` property
      const checkouts = await prisma.checkout.findMany({
        where: { userId },
        include: { 
          book: true,  // Include related book data directly in the result
        },
      });

      console.log("this is the checkouts", checkouts)
  
      return res.json({ checkouts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  

// Function to handle book check-in
const checkInBook = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Check-in request received for checkout ID:", id);

        // Update checkout record
        const checkout = await prisma.checkout.update({
            where: { id: parseInt(id, 10) },
            data: {
                checkinDate: new Date(),
                status: 'RETURNED',
            },
            include: { book: true } // Include related book data
        });

        console.log("Book checked in successfully:", checkout);

        res.status(200).json({ 
            message: "Book checked in successfully", 
            checkout,
            book: checkout.book // Include book details
        });
    } catch (error) {
        console.error("Error checking in book:", error.message);
        res.status(500).json({ error: "Failed to check in book" });
    }
};


// Export the functions for use in routes
module.exports = { checkOutBook, checkInBook, getCheckOutBook };
