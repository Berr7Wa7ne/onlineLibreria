const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma.js");

// Use environment variable for JWT secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;

/**
 * Middleware to protect routes and ensure proper user authentication and authorization.
 * @param {Array} roles - An array of allowed roles for the route. Defaults to an empty array (no role restriction).
 * @returns Middleware function for authentication and role-based authorization.
 */
const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Retrieve the token from headers
      const token = req.header("x-auth-token") || req.header("Authorization")?.split(" ")[1];
      console.log("Received Token:", token);

      // Check if a token is provided
      if (!token) {
        console.error("No token provided");
        return res.status(401).json({ error: "No token provided" });
      }

      console.log("Verifying token...");
      // Verify the token using the JWT secret key
      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      console.log("Decoded Token:", decoded);

      // Query the user from the database based on the decoded token's userId
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, role: true },
      });
      console.log("Queried User from Database:", user);

      // Handle case where the user does not exist in the database
      if (!user) {
        console.error("User not found in the database");
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the user's role is permitted for the route
      if (roles.length > 0 && !roles.includes(user.role)) {
        console.error("Access denied: User role not permitted");
        return res.status(403).json({ error: "Forbidden: Access denied" });
      }

      // Attach the authenticated user to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);

      // Handle invalid token or other authentication errors
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = { protect };
