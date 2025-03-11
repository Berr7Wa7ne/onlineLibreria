const { PrismaClient } = require('@prisma/client'); // Prisma ORM for database operations
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating JSON Web Tokens (JWTs)

// Initialize Prisma Client
const prisma = new PrismaClient();

// Secret key for JWT signing, fetched from environment variables or a default fallback
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your_default_secret_key"; // Replace with a secure key in production

// Main function to seed the database with a default super admin
async function main() {
  try {
    console.log("Initializing default Super Admin...");

    // Hash the password BEFORE passing it to Prisma
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log("Password hashed successfully");

    // Ensure a default super admin user exists in the database
    const defaultLibrarian = await prisma.user.upsert({
      where: { email: 'admin@library.com' }, // Check if the user exists based on email
      update: {
        role: 'SUPERADMIN', // Update the role to SUPERADMIN if the user already exists
        firstName: 'Library',
        lastName: 'Superadmin',
        displayName: 'SuperAdmin',
        address: 'Abuja, Nigeria',
        phoneNumber: '08108962585',
        bio: "Managing the online library system.",
        profilePhoto: "", // Ensure this is not null (or set a default image)
      },
      create: {
        email: 'admin@library.com', // Default super admin email
        password: hashedPassword, // Use pre-hashed password
        firstName: 'Library', 
        lastName: 'Superadmin',
        displayName: 'SuperAdmin',
        address: 'Abuja, Nigeria',
        phoneNumber: '08108962585',
        bio: "Managing the online library system.",
        profilePhoto: "", // Ensure this is not null
        role: 'SUPERADMIN', // Assign the SUPERADMIN role
      },
    });

    console.log('Default librarian created:', defaultLibrarian);

    // Generate a JWT token for the default super admin
    const token = jwt.sign(
      { userId: defaultLibrarian.id, role: defaultLibrarian.role }, // Payload: user ID and role
      JWT_SECRET_KEY, // Secret key for signing the token
      { expiresIn: '1d' } // Token validity (1 day in this case)
    );

    console.log('Super Admin Token:', token);
  } catch (error) {
    console.error("Error initializing Super Admin:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client is disconnected after execution
  }
}

// Execute the main function
main();
