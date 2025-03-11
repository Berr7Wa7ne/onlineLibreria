import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

const AdminSidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-8 text-center">SuperAdmin Panel</h2>
      
      <ul className="space-y-6">
        {/* Library Dashboard (Overview) */}
        <li>
          <Link to="/librarian" className="flex items-center space-x-3 text-lg hover:text-orange-500">
            <span>📚</span>
            <span>Library Dashboard</span>
          </Link>
        </li>

        {/* Manage Librarians */}
        <li>
          <Link to="/superadmin/manage-librarians" className="flex items-center space-x-3 text-lg hover:text-orange-500">
            <span>➕</span>
            <span>Manage Librarians</span>
          </Link>
        </li>

        {/* Update Books Section */}
        <li>
          <Link to="/superadmin/overdue-books" className="flex items-center space-x-3 text-lg hover:text-orange-500">
            <span>⚠️</span>
            <span>Overdue Books</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
