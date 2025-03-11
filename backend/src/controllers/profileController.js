const prisma = require("../models/prisma.js");

// Get librarian profile
const getProfile = async (req, res) => {
  try {
    // Extract user ID from `req.user`
    const userId = req.user?.id; 

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing from authentication token." });
    }

    console.log("Decoded user ID:", userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        displayName: true,
        email: true,
        phoneNumber: true,
        address: true,
        bio: true,
        profilePhoto: true,
      },
    });

    console.log("This is the user", user)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Profile fetched successfully", user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update personal details
const updateProfile = async (req, res) => {
  try {

    console.log("Received File in Backend:", req.file);
    console.log("Received FormData in Backend:", req.body);
    // Extract user ID from `req.user`
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing from authentication token." });
    }

    console.log("Received Request Payload:", req.body);

    const { firstName, lastName, displayName, email, phoneNumber, address } = req.body;
    
    // Check if a file was uploaded
    let filePath = null;
    if (req.file) {
      console.log("Uploaded file:", req.file); // Debugging
      filePath = `/uploads/${req.file.filename}`;
      console.log("This is the file path", filePath);
    }

    // Prepare update data
    const updateData = { firstName, lastName, displayName, email, phoneNumber, address };
    
    // If a file was uploaded, include profilePhoto in update
    if (filePath) {
      updateData.profilePhoto = filePath;
    }

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    console.log("This is the updatedUser", updatedUser)

    res.json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};


// Update bio
const updateBio = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio } = req.body;
    console.log("This is the bio", bio)
    await prisma.user.update({ where: { id: userId }, data: { bio } });
    res.json({ message: "Bio updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update bio" });
  }
};

// // Upload profile picture
// const uploadProfilePhoto = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const imageUrl = `/uploads/${req.file.filename}`;
//     console.log("This is the profile photo", imageUrl)
//     const updatedUser = await prisma.user.update({ 
//       where: { id: userId }, 
//       data: { profilePhoto: imageUrl },
//       select: {
//         firstName: true,
//         lastName: true,
//         displayName: true,
//         email: true,
//         phoneNumber: true,
//         address: true,
//         bio: true,
//         profilePhoto: true,
//       },
//     });

//     console.log("This is the updatedUser", updatedUser);
//     res.json({ message: "Profile photo updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile photo:", error);
//     res.status(500).json({ error: "Failed to update profile photo" });
//   }
// };

module.exports = {getProfile, updateProfile, updateBio};
