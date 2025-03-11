import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import google from '../../assets/google.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    bio: '',
    profilePhoto: null,
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const API_BASE_URL = process.env.VITE_BACKEND_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-6 md:px-10 lg:px-20">
      <div className="w-full max-w-lg">
        <h2 className="text-center text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-center text-gray-600 text-sm mb-6">Start your 30-day free trial. Cancel anytime.</p>

        <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
          <InputField label="Profile Photo" type="file" name="profilePhoto" onChange={handleFileChange} />
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <InputField label="Display Name" name="displayName" value={formData.displayName} onChange={handleChange} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
          <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <InputField label="Bio" name="bio" value={formData.bio} onChange={handleChange} isTextarea />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type='submit' className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-[2px] bg-gray-300"></div>
          <p className="px-4 text-gray-600 text-sm">Or</p>
          <div className="flex-1 h-[2px] bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg">
          <img src={google} alt="Google" className="w-5 h-5" />
          <span>Sign Up with Google</span>
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", name, value, onChange, isTextarea, onChangeFile }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    {isTextarea ? (
      <textarea name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg resize-none" rows="3"></textarea>
    ) : type === "file" ? (
      <input type="file" name={name} onChange={onChangeFile} className="w-full border rounded-lg p-2" />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg" />
    )}
  </div>
);

export default SignUp;
