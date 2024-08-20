import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePhdHolderForm = ({ phdHolder, onPhdHolderUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    fieldOfStudy: '',
    yearOfCompletion: '',
    publications: '',
    image: null,
  });

  useEffect(() => {
    if (phdHolder) {
      setFormData({
        name: phdHolder.name,
        university: phdHolder.university,
        fieldOfStudy: phdHolder.fieldOfStudy,
        yearOfCompletion: phdHolder.yearOfCompletion,
        publications: phdHolder.publications.join(', '),
        image: null,
      });
    }
  }, [phdHolder]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('university', formData.university);
    data.append('fieldOfStudy', formData.fieldOfStudy);
    data.append('yearOfCompletion', formData.yearOfCompletion);
    data.append('publications', formData.publications.split(',').map(pub => pub.trim()));
    if (formData.image) data.append('image', formData.image);

    try {
      const response = await axios.put(`http://localhost:5000/api/phd-holders/${phdHolder._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onPhdHolderUpdated(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="university">
          University
        </label>
        <input
          type="text"
          name="university"
          id="university"
          value={formData.university}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldOfStudy">
          Field of Study
        </label>
        <input
          type="text"
          name="fieldOfStudy"
          id="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearOfCompletion">
          Year of Completion
        </label>
        <input
          type="number"
          name="yearOfCompletion"
          id="yearOfCompletion"
          value={formData.yearOfCompletion}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publications">
          Publications (comma separated)
        </label>
        <input
          type="text"
          name="publications"
          id="publications"
          value={formData.publications}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full px-3 py-2 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700">
        Update PHD Holder
      </button>
    </form>
  );
};

export default UpdatePhdHolderForm;
