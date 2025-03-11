const prisma = require("../models/prisma.js");

// Add a book (Librarian-only)
const addBook = async (req, res) => {
  console.log("Add Book: Received request to add a new book.");

  try {
    // Destructure the request body to get book details
    const { title, isbn, coverPage, revisionNumber, publishedDate, publisher, authors, genre } = req.body;
    const bookPhoto = req.file?.path;

    // Check if bookPhoto is provided
    if (!bookPhoto) {
      return res.status(400).json({ error: "Book cover photo is required." });
    }

    console.log("Add Book: Request body parsed successfully.", {
      title,
      bookPhoto,
      isbn,
      coverPage,
      revisionNumber,
      publishedDate,
      publisher,
      authors,
      genre,
    });

    // Create a new book record in the database
    const newBook = await prisma.book.create({
      data: {
        title,
        bookPhoto,
        isbn,
        coverPage,
        revisionNumber: +revisionNumber,
        publishedDate: new Date(publishedDate), // Convert publishedDate to a Date object
        publisher,
        authors,
        genre,
      },
    });

    console.log("Add Book: New book added successfully.", newBook);

    // Send a success response
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Add Book: Error occurred while adding a book.", error.message);

    // Send an error response
    res.status(500).json({ error: "Failed to add book" });
  }
};


// Update book details (Librarian-only)
const updateBook = async (req, res) => {
  console.log("Update Book: Received request to update book details.");

  try {
    // Get the book ID from request parameters and other details from the body
    const { id } = req.params;
    const { title, isbn, coverPage, revisionNumber, publishedDate, publisher, authors, genre } = req.body;

    console.log("Update Book: Request parameters and body parsed successfully.", {
      id,
      title,
      isbn,
      revisionNumber,
      publishedDate,
      publisher,
      authors,
      genre,
    });

    // Update the book record in the database
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id, 10) }, // Parse the ID to an integer
      data: {
        title,
        isbn,
        coverPage,
        revisionNumber,
        publishedDate: new Date(publishedDate), // Convert publishedDate to a Date object
        publisher,
        authors,
        genre,
      },
    });

    console.log("Update Book: Book updated successfully.", updatedBook);

    // Send a success response
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Update Book: Error occurred while updating the book.", error.message);

    // Check for specific Prisma error (e.g., record not found)
    if (error.code === "P2025") {
      console.warn("Update Book: No book found with the provided ID.");
    }

    // Send an error response
    res.status(500).json({ error: "Failed to update book" });
  }
};

// Search for books
const searchBooks = async (req, res) => {
  try {
    console.log("SearchBooks: Received search request with query parameters:", req.query);

    // Destructure query parameters for search filters
    const { title, isbn, publisher, dateAdded } = req.query;

    console.log("SearchBooks: Constructing search filters...");
    const filters = {
      ...(title && { title: { contains: title, mode: 'insensitive' } }), // Case-insensitive title filter
      ...(isbn && { isbn }), // Exact match for ISBN
      ...(publisher && { publisher: { contains: publisher, mode: 'insensitive' } }), // Case-insensitive publisher filter
      ...(dateAdded && { dateAdded: new Date(dateAdded) }), // Match books added on a specific date
    };

    console.log("SearchBooks: Filters constructed:", filters);

    // Query the database using the constructed filters
    console.log("SearchBooks: Querying database for books...");
    const books = await prisma.book.findMany({ where: filters });

    console.log(`SearchBooks: Found ${books.length} book(s).`);

    // Send the search results as a response
    res.status(200).json(books);
  } catch (error) {
    console.error("SearchBooks: Error occurred while searching books:", error.message);

    // Send an error response
    res.status(500).json({ error: "Failed to search books" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    console.log("Fetching all books..."); // Log to check if the function is called

    const books = await prisma.book.findMany(); // ✅ Use findMany() instead of findAll()

    console.log("Books fetched successfully:", books); // Log fetched books
    res.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error); // Log full error details
    res.status(500).json({ error: "Failed to fetch books", details: error.message });
  }
};

// Export the functions for use in routes
module.exports = { addBook, updateBook, searchBooks, getAllBooks };
