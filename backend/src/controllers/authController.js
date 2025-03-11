const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma"); // Adjust the path as needed

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET;

// CreateLibrarian Controller
const createLibrarian = async (req, res) => {
  try {
    const { email, password, firstName, lastName, displayName, address, phoneNumber, bio} = req.body;
    const profilePhoto = req.file?.path;
    console.log("Received request to create librarian with email:", email);

    console.log("Middleware attached user:", req.user);
    if (!req.user || !req.user.role) {
    return res.status(500).json({ error: "User role not found in request. Ensure authentication middleware is applied." });
    }


    const superAdminExists = await prisma.user.findFirst({
      where: { role: "SUPERADMIN" },
    });
    console.log("Super admin existence check result:", superAdminExists);

    if (!superAdminExists) {
      console.error("No SUPERADMIN exists in the database.");
      return res.status(500).json({ error: "No SUPERADMIN exists. Please initialize the database." });
    }

    // Check if the user is a super admin
    console.log("User role:", req.user.role);
    if (req.user.role !== "SUPERADMIN") {
      console.warn("Unauthorized access attempt by user with role:", req.user.role);
      return res.status(403).json({ error: "Only super admin can create librarian accounts" });
    }

    

    // Hash the password and create the librarian user
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating new librarian user...");
    const newLibrarian = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        displayName,
        address,
        phoneNumber,
        bio,
        role: "LIBRARIAN",
        profilePhoto,
      },
    });
    console.log("Librarian created successfully:", newLibrarian);

    res.status(201).json({ message: "Librarian created successfully", user: newLibrarian });
  } catch (error) {
    console.error("Failed to create librarian:", error);
    res.status(500).json({ error: "Failed to create librarian" });
  }
};

// Registration Controller
const register = async (req, res) => {
  const { email, password, firstName, lastName, displayName, address, phoneNumber, bio, role } = req.body;
  const profilePhoto = req.file?.path; // If using multer for profile photo uploads
  console.log("Registration request received for email:", email);
  console.log("Profile photo uploaded to:", profilePhoto);

  // Prevent users from registering as librarians
  if (role && role.toLowerCase() === "librarian") {
    console.warn("Attempt to register with forbidden role:", role);
    return res.status(403).json({ error: "Cannot register as librarian" });
  }

  try {
    // Check if the user already exists
    console.log("Checking if user already exists...");
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.warn("User already exists with email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    console.log("Creating new user...");
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        displayName,
        address,
        phoneNumber,
        bio,
        role: role || "READER", // Default to "reader"
        profilePhoto,
      },
    });
    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User registered successfully", user: { 
      id: user.id, 
      email: user.email, 
      role: user.role } });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received for email:", email);

  try {
    console.log("Finding user by email...");
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.warn("User not found with email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("Invalid password for email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Generating JWT token...");
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET_KEY, { expiresIn: "1h" });

    console.log("Login successful for email:", email);
    res.status(200).json({ message: "Login successful", token, role: user.role }); // ✅ Added role here
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};


module.exports = { createLibrarian, register, login };
