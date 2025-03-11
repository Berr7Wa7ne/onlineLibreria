import React from 'react';
import { Outlet } from 'react-router-dom'; // Render sub-routes
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';

const SuperAdmin = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar on the left */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-gray-100 shadow">
        <AdminSidebar />
      </aside>

      {/* Main content on the right with left margin equal to sidebar width */}
      <div className="ml-64 flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Librarian Panel</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdmin;
