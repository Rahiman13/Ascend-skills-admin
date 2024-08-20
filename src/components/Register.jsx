import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    collegeName: '',
    mobile: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ascend-skills-backend.onrender.com/api/users/register', formData);
      console.log(response.data);
      alert('Registration Successful');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        alert(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        alert('No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };


  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 font-sans">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url(/path/to/your/background-image.png)' }}></div>
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-filter backdrop-blur-md z-10">
        <h1 className="text-3xl font-bold text-center text-gray-100 opacity-90 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-gray-100 bg-opacity-50 text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-gray-200 opacity-80">
          <a href="/login" className="hover:underline">Login</a>
          <a href="#" className="hover:underline">Forgot Password</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
