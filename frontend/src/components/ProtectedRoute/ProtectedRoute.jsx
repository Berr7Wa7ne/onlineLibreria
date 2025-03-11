import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  const role = localStorage.getItem("role"); // Get role from storage
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
