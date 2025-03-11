import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";

const Profile = () => {
  const [profile, setProfile] = useState({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    displayName: "",
    address: "",
    email: "",
    phoneNumber: "",
    bio: "",
  });
  const [editing, setEditing] = useState({
    personal: false,
    bio: false,
    profilePhoto: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.VITE_BACKEND_URL;

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from storage

        const res = await axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        const userData = res.data.user;
        setProfile(userData);

        // Store the profile photo URL in localStorage
        if (userData.profilePhoto) {
          localStorage.setItem("profilePhoto", userData.profilePhoto);
          console.log("Stored profile photo:", localStorage.getItem("profilePhoto"));
        }

        console.log("This is the response data", res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile photo URL from localStorage
  useEffect(() => {
    const storedPhoto = localStorage.getItem("profilePhoto");

    // Check if the stored photo exists and is a valid string
    if (storedPhoto) {
      // Check if the stored photo is already a full URL
      const isFullUrl = storedPhoto.startsWith("http://") || storedPhoto.startsWith("https://");

      // Construct the full URL if it's not already a full URL
      const fullPhotoUrl = isFullUrl ? storedPhoto : `${API_BASE_URL}${storedPhoto}`;

      // Update the state only if the new URL is different from the current state
      setProfile((prev) => {
        if (prev.profilePhoto !== fullPhotoUrl) {
          return {
            ...prev,
            profilePhoto: fullPhotoUrl,
          };
        }
        return prev; // No need to update if the URL is the same
      });
    }
  }, [API_BASE_URL]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePhoto: file,
      }));
    }
  };

  const handleUpdate = async (section) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append profile data except profilePhoto
    Object.keys(profile).forEach((key) => {
      if (key !== "profilePhoto" && profile[key]) {
        formData.append(key, profile[key]);
      }
    });

    // Append profilePhoto only if it's a File
    if (profile.profilePhoto instanceof File) {
      formData.append("profilePhoto", profile.profilePhoto);
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.updatedUser) {
        setProfile(response.data.updatedUser); // Correct field name

        // Store the updated profile photo URL safely
        if (response.data.updatedUser.profilePhoto) {
          const newPhotoUrl = response.data.updatedUser.profilePhoto;
          setProfile((prevProfile) => ({
            ...prevProfile,
            profilePhoto: newPhotoUrl,
          }));
          localStorage.setItem("profilePhoto", newPhotoUrl);
          console.log("Updated Profile Photo:", newPhotoUrl);
        }
      } else {
        console.error("Unexpected API response:", response.data);
      }

      alert("Profile updated successfully!");

      // Set only the specific section to false instead of resetting all
      setEditing((prev) => ({ ...prev, [section]: false }));
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="pt-16">
      <TopNavbar />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
            {profile.profilePhoto ? (
              <img
                src={
                  profile.profilePhoto instanceof File
                    ? URL.createObjectURL(profile.profilePhoto)
                    : profile.profilePhoto || localStorage.getItem("profilePhoto") || "/default-avatar.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-fill"
              />
            ) : (
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0" onChange={handleFileChange} />
          </div>
        </div>

        {/* Name and Display Name */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[purple] dark:text-gray-400 font-courgette">{profile.displayName || "Display Name"}</h2>
          <p className="text-gray-600">{profile.firstName} {profile.lastName}</p>
        </div>

        {/* Personal Information Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[orange] dark:text-gray-400">Personal Information</h3>
            {!editing.personal ? (
              <button onClick={() => setEditing({ ...editing, personal: true })} className="text-[purple] dark:text-gray-400">Edit</button>
            ) : (
              <button onClick={() => handleUpdate("personal")} className="text-green-500">Save</button>
            )}
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={profile.firstName}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={profile.displayName}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={profile.address}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={profile.email}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg mb-4"
              disabled={!editing.personal}
            />
          </div>
        </div>

        {/* Bio Information Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-[orange] dark:text-gray-400">
            <h3 className="text-lg font-semibold">Bio Information</h3>
            {!editing.bio ? (
              <button onClick={() => setEditing({ ...editing, bio: true })} className="text-[purple] dark:text-gray-400">Edit</button>
            ) : (
              <button onClick={() => handleUpdate("bio")} className="text-green-500">Save</button>
            )}
          </div>
          <textarea
            name="bio"
            placeholder="Enter Bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg resize-y min-h-[100px]"
            disabled={!editing.bio}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={() => window.location.reload()}>Cancel</button>
          <button onClick={() => handleUpdate("personal")} className="px-4 py-2 bg-[purple] dark:bg-gray-400 hover:bg-blue-600 text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;