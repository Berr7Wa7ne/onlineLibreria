import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

const Librarian = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 w-64 bg-gray-100 dark:bg-gray-900 shadow">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          <Outlet />
        </main>
      </div>

      {/* Footer at Bottom */}
      <div className="mt-48">
      </div>
      <Footer />
    </div>
  );
};

export default Librarian;
