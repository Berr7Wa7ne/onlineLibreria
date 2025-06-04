require('dotenv').config();

const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Function to initialize Superadmin
async function initializeSuperAdmin() {
  try {
    if (process.env.INIT_SUPERADMIN === 'true') {
      console.log('Initializing Superadmin...');
      const superAdminEmail = 'admin@library.com';
      const superAdminPassword = 'password123';
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

      const superAdmin = await prisma.user.upsert({
        where: { email: superAdminEmail },
        update: {
          role: 'SUPERADMIN',
        },
        create: {
          email: superAdminEmail,
          password: await bcrypt.hash(superAdminPassword, 10),
          firstName: 'Library', 
          lastName: 'Superadmin',
          displayName: 'SuperAdmin',
          address: 'Abuja, Nigeria',
          phoneNumber: '08108962585',
          bio: "Managing the online library system.",
          profilePhoto: "", // Ensure this is not null
          role: 'SUPERADMIN',
        },
      });

      const token = jwt.sign({ userId: superAdmin.id, role: 'SUPERADMIN' }, JWT_SECRET_KEY, {
        expiresIn: '30d', // Adjust as needed
      });

      console.log('Superadmin initialized successfully.');
      console.log('Use this token for superadmin actions:', token);
    } else {
      console.log('Skipping Superadmin initialization (INIT_SUPERADMIN not set to true).');
    }
  } catch (error) {
    console.error('Failed to initialize superadmin:', error);
    process.exit(1); // Exit the process if superadmin initialization fails
  } finally {
    // Ensure Prisma disconnects to free resources
    await prisma.$disconnect();
  }
}

// Start the server after initializing Superadmin
initializeSuperAdmin()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during server startup:', error);
    process.exit(1);
  });

