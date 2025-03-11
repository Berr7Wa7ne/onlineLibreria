import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for active route detection

const Sidebar = () => {
  const location = useLocation(); // Get current route

  // Define a function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed w-64 h-[415px] bg-[purple] dark:bg-gray-900 text-gray-200 p-5 border rounded-xl mt-[66px]">
      <ul className="space-y-6">
        {/* Library Dashboard (Overview) */}
        <li>
          <Link
            to="/librarian"
            className={`flex items-center space-x-3 text-lg px-3 py-2 rounded-lg 
              ${isActive('/librarian') ? 'bg-gray-300 text-black dark:text-orange-400 dark:bg-transparent' : 'hover:text-orange-500'}`}
          >
            <span>📚</span>
            <span>Library Dashboard</span>
          </Link>
        </li>

        {/* Add Books Section */}
        <li>
          <Link
            to="/librarian/add-book"
            className={`flex items-center space-x-3 text-lg px-3 py-2 rounded-lg 
              ${isActive('/librarian/add-book') ? 'bg-gray-300 text-black dark:text-orange-400 dark:bg-transparent' : 'hover:text-orange-500'}`}
          >
            <span>➕</span>
            <span>Add Books</span>
          </Link>
        </li>

        {/* Update Books Section */}
        <li>
          <Link
            to="/librarian/update-book"
            className={`flex items-center space-x-3 text-lg px-3 py-2 rounded-lg 
              ${isActive('/librarian/update-book') ? 'bg-gray-300 text-black dark:text-orange-400 dark:bg-transparent' : 'hover:text-orange-500'}`}
          >
            <span>✏️</span>
            <span>Update Books</span>
          </Link>
        </li>

        {/* Overdue Books Section */}
        <li>
          <Link
            to="/librarian/overdue-books"
            className={`flex items-center space-x-3 text-lg px-3 py-2 rounded-lg 
              ${isActive('/librarian/overdue-books') ? 'bg-gray-300 text-black dark:text-orange-400 dark:bg-transparent' : 'hover:text-orange-500'}`}
          >
            <span>⚠️</span>
            <span>Overdue Books</span>
          </Link>
        </li>

        {/* Profile Section */}
        <li>
          <Link
            to="/librarian/profile"
            className={`flex items-center space-x-3 text-lg px-3 py-2 rounded-lg 
              ${isActive('/librarian/profile') ? 'bg-gray-300 text-black dark:text-orange-400 dark:bg-transparent' : 'hover:text-orange-500'}`}
          >
            <span>👤</span>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
