import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/book/getAllBooks`);
        setBooks(response.data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books.");
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/book/updateBook/${selectedBook.id}`,
        selectedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setSelectedBook(null);

      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? response.data.book : book
      );
      setBooks(updatedBooks);
    } catch (err) {
      setError("Failed to update book. Please try again.");
      console.error("UpdateBook Error:", err.message);
    }
  };

  return (
    <div className="pt-16">
      <TopNavbar />
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center font-sf-pro-rounded text-[orange] dark:text-gray-100">Manage Books</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">ISBN</th>
              <th className="border border-gray-300 p-2">Cover Page</th>
              <th className="border border-gray-300 p-2">Revision No.</th>
              <th className="border border-gray-300 p-2">Authors</th>
              <th className="border border-gray-300 p-2">Genre</th>
              <th className="border border-gray-300 p-2">Publisher</th>
              <th className="border border-gray-300 p-2">Published Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border border-gray-300 text-xs">
                <td className="p-2">{book.id}</td>
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">{book.coverPage}</td>
                <td className="p-2">{book.revisionNumber}</td>
                <td className="p-2">{book.authors}</td>
                <td className="p-2">{book.genre}</td>
                <td className="p-2">{book.publisher}</td>
                <td className="p-2">{new Date(book.publishedDate).toDateString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-[purple] dark:bg-slate-400 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedBook && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-6">
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 text-center">Edit Book</h3>
      <form onSubmit={handleUpdate} className="space-y-2">
        {[
          { key: "title", label: "Title" },
          { key: "isbn", label: "ISBN" },
          { key: "coverPage", label: "Cover Page" },
          { key: "revisionNumber", label: "Revision" },
          { key: "publisher", label: "Publisher" },
          { key: "authors", label: "Authors" },
          { key: "genre", label: "Genre" },
          { key: "publishedDate", label: "Published" },
        ].map(({ key, label }) => (
          <div key={key} className="text-lg">
            <label className="block font-medium">{label}:</label>
            <input
              type={key === "publishedDate" ? "date" : "text"}
              value={selectedBook[key]}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, [key]: e.target.value })
              }
              className="w-full border p-1 rounded text-lg"
            />
          </div>
        ))}
        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            className="w-1/2 bg-green-500 text-white p-1 rounded text-lg"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setSelectedBook(null)}
            className="w-1/2 bg-red-500 text-white p-1 rounded text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default UpdateBook;
