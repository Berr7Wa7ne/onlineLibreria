import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar/Navbar";
import ReaderFooter from "../../../components/ReaderFooter/ReaderFooter";

const Checkout = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expectedCheckinDate, setExpectedCheckinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // Adjust based on preference

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books.");
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (location.state?.book) {
      setSelectedBook(location.state.book);
      setIsModalOpen(true);
    }
  }, [location.state]);

  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 10);
    setExpectedCheckinDate(defaultDate.toISOString().split("T")[0]);
  }, []);

  const handleCheckout = async () => {
    if (!selectedBook) {
      setError("No book selected.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      setError("");

      await axios.post(
        `${API_BASE_URL}/check/checkout`,
        {
          bookId: selectedBook.id,
          expectedCheckinDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsModalOpen(false);
      alert("Book checked out successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
      setError(error.response?.data?.error || "Failed to checkout book");
    } finally {
      setIsLoading(false);
    }
  };

  // **Pagination Logic**
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div>
    <Navbar />
    <div className="max-w-6xl mx-auto p-8 space-y-8 mt-32">
      <h1 className="text-3xl font-bold text-[orange] text-center">
        My <span className="text-[purple]">Books</span>
      </h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-900 p-6 w-full flex flex-col items-center space-y-4 hover:shadow-xl transform transition-all scale-105">
              {book.bookPhoto && (
                <img
                  src={`http://localhost:5000/${book.bookPhoto}`}
                  alt={book.title}
                  className="w-40 h-56 object-cover rounded-lg"
                />
              )}

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-[orange]">{book.title}</h3>
                <p className="text-gray-700 dark:text-white text-sm">{book.authors}</p>
                <p className="text-gray-700 dark:text-white text-sm">{book.publisher}</p>
                <p className="text-gray-700 dark:text-white text-sm">{book.publishedDate?.split("T")[0]}</p>
                <p className="text-gray-700 dark:text-white text-sm">{book.genre}</p>
              </div>

              <button
                onClick={() => { setSelectedBook(book); setIsModalOpen(true); }}
                className="bg-[purple] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Borrow Book
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No books available.</p>
        )}
      </div>

{/* Pagination Controls */}
<div className="flex justify-center space-x-72 mt-6">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md flex items-center justify-center space-x-1 ${
      currentPage === 1
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[blue] text-white hover:bg-blue-600"
    }`}
  >
    {/* Animated <<< Icon */}
    {[...Array(3)].map((_, index) => (
      <motion.svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
        animate={{ x: [0, -3, 0] }} // Move left slightly
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </motion.svg>
    ))}
  </button>

  <span className="px-4 py-2 bg-gray-200 dark:bg-gray-900 dark:border rounded-md">{currentPage} / {totalPages}</span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 rounded-md flex items-center justify-center space-x-1 ${
      currentPage === totalPages
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[blue] text-white hover:bg-blue-600"
    }`}
  >
    {/* Animated >>> Icon */}
    {[...Array(3)].map((_, index) => (
      <motion.svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
        animate={{ x: [0, 3, 0] }} // Move right slightly
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </motion.svg>
    ))}
  </button>
</div>
<div className="mt-28">
<ReaderFooter/>
</div>
</div>

      {isModalOpen && selectedBook && (
        <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-red-700 hover:text-gray-800">
              ❌
            </button>

            <div className="text-center">
              {selectedBook.bookPhoto && (
                <img
                  src={`http://localhost:5000/${selectedBook.bookPhoto}`}
                  alt={selectedBook.title}
                  className="w-20 h-26 object-cover rounded-lg mx-auto mb-4"
                />
              )}
              <h3 className="text-2xl font-bold mb-4 text-[orange]">Checkout Book</h3>
              <div className="dark:text-white">
              <p>Title: <strong>{selectedBook.title}</strong></p>
              <p>Author: {selectedBook.authors}</p>
              <p>Publisher: {selectedBook.publisher}</p>
              <p>Published Date: {selectedBook.publishedDate?.split("T")[0]}</p>
              <p>Genre: {selectedBook.genre}</p>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="checkinDate" className="block text-gray-600 dark:text-gray-300">Expected Check-In Date</label>
              <input
                id="checkinDate"
                type="date"
                value={expectedCheckinDate}
                onChange={(e) => setExpectedCheckinDate(e.target.value)}
                className="w-full border border-gray-300 dark:bg-gray-900 rounded p-2 mt-2"
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-center mt-6">
              <button onClick={handleCheckout} className="bg-[purple] text-white px-4 py-2 rounded" disabled={isLoading || !expectedCheckinDate}>
                {isLoading ? "Processing..." : "Confirm Checkout"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
