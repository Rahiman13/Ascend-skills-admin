import React, { useState } from 'react';
import axios from 'axios';

const AddCollegeForm = ({ onCollegeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    logo: null,
  });

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
      const response = await axios.post('http://localhost:5000/api/colleges', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCollegeAdded(response.data);
    } catch (error) {
      console.error('Error adding college:', error);
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
      <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
        Add College
      </button>
    </form>
  );
};

export default AddCollegeForm;
