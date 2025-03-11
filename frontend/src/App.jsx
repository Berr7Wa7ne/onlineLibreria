import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import the new component
import Home from "./pages/Reader/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Checkout from "./pages/Reader/CheckOut/CheckOut";
import CheckIn from "./pages/Reader/CheckIn/CheckIn";
import Librarian from "./pages/Librarian/Librarian";
import LibrarianDashboard from "./pages/Librarian/LibrarianDashboard/LibrarianDashboard";
import AddBook from "./pages/Librarian/AddBook/AddBook";
import UpdateBook from "./pages/Librarian/UpdateBook/UpdateBook";
import OverDueBooks from "./pages/Librarian/OverDueBook/OverDueBook";
import Profile from "./pages/Librarian/Profile/Profile";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import ManageLibrarian from "./pages/SuperAdmin/ManageLibrarians/ManageLibrarians";
import OverDueBook from "./pages/SuperAdmin/OverDueBooks/OverDueBook";
import 'leaflet/dist/leaflet.css';

function App() {
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user data
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) return;

    setTimeout(() => {
        if (role === "READER" && location.pathname.startsWith("/librarian")) {
            navigate("/home"); 
        } else if (role === "LIBRARIAN" && location.pathname.startsWith("/superadmin")) {
            navigate("/librarian");
        } else if (role === "SUPERADMIN" && location.pathname.startsWith("/librarian")) {
            navigate("/superadmin");
        }
    }, 200); // Small delay
}, [role, location, navigate]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkin" element={<CheckIn />} />

        {/* Librarian Protected Routes */}
        <Route
          path="/librarian"
          element={
            <ProtectedRoute user={user} allowedRoles={["LIBRARIAN"]}>
              <Librarian />
            </ProtectedRoute>
          }
        >
          <Route index element={<LibrarianDashboard />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="update-book" element={<UpdateBook />} />
          <Route path="overdue-books" element={<OverDueBooks />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* SuperAdmin Protected Routes */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute user={user} allowedRoles={["SUPERADMIN"]}>
              <SuperAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="manage-librarians" element={<ManageLibrarian />} />
          <Route path="overdue-books" element={<OverDueBook />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
