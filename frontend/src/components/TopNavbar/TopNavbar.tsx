import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Bell } from "lucide-react"; // For icons

const TopNavbar = () => {
  const profilePhoto = localStorage.getItem("profilePhoto") || "/default-avatar.png";

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🌓 Function to Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // 🌓 Apply dark mode on page load
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search logic (e.g., API call, filtering books, etc.)
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 dark:bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left - Logo */}
    <div className="flex items-center gap-2">
      <img src="/public/library-logo.jpg" alt="Library Logo" className="w-8 h-8 rounded-full" />
      <span className="text-2xl font-bold text-[orange] font-sf-pro-rounded">
        Online <span className=" text-[purple] font-courgette">Library</span>
      </span>
    </div>

      {/* Middle - Search Bar */}
      <form onSubmit={handleSearch} className="hidden md:flex w-1/3">
        <input
          type="text"
          placeholder="Search books, users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-[purple] dark:bg-gray-400 text-white rounded-lg">
          🔍
        </button>
      </form>

      {/* Right - Theme Toggle, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle */}
        <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Notification Bell */}
        <button className="relative text-gray-600 dark:text-gray-300">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
        </button>

        {/* Profile Picture */}
        <Link to="/profile">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          />
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
