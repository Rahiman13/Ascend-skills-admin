import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('https://ascend-skills-backend.onrender.com/api/users/login', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      alert('Login Successful');
      navigate('/dashboard'); // Assuming you have a dashboard route
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-gray-800 font-sans">
      <div className="w-80 h-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-purple-600">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
