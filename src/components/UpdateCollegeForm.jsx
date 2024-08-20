import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCollegeForm = ({ college, onCollegeUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    logo: null,
  });

  useEffect(() => {
    setFormData({
      name: college.name,
      location: college.location,
      description: college.description,
      logo: null,
    });
  }, [college]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/colleges/${college._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCollegeUpdated(response.data);
    } catch (error) {
      console.error('Error updating college:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="file"
        name="logo"
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />
      <button type="submit" className="w-full p-3 bg-green-500 text-white rounded">
        Update College
      </button>
    </form>
  );
};

export default UpdateCollegeForm;
