import React, { useState } from "react";
import axios from "axios";
import HeroImage from "../../assets/library-4.jpg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const API_BASE_URL = process.env.VITE_BACKEND_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/book/searchBooks`, {
        params: { title: searchQuery },
      });
      const results = response.data;

      if (results.length > 0) {
        setTitles(results);
      } else {
        setTitles([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error("Error searching books:", err);
      setError("Failed to fetch search results.");
    }
  };

  const handleCheckoutNavigation = (book) => {
    navigate("/checkout", { state: { book } });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 space-x-8 mt-24">
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white leading-tight">
          Today's research, <br /> tomorrow's innovation
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Accelerating research discovery to shape a better future
        </p>

        <div className="mt-8 flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search books, keywords"
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-[blue] text-white hover:bg-blue-700"
          >
            🔍
          </button>
        </div>

        <div className="mt-4">
          {titles.length > 0 ? (
            <ul className="border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto">
              {titles.map((book, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleCheckoutNavigation(book)}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          ) : (
            error && <p className="mt-4 text-gray-500">{error}</p>
          )}
        </div>
      </div>

      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <img
          src={HeroImage}
          alt="Research illustration"
          className="w-full max-w-sm"
        />
      </div>
    </div>
  );
};

export default HeroSection;