import React, { useState } from 'react';
import axios from 'axios';

const AddCompanyModal = ({ show, handleClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [countOfPlacedStudents, setCountOfPlacedStudents] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ascend-skills-backend.onrender.com/api/companies', {
        name,
        logo,
        location,
        description,
        countOfPlacedStudents: parseInt(countOfPlacedStudents, 10),
        industry,
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Company</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields for company details */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input
              id="logo"
              type="text"
              placeholder="Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="countOfPlacedStudents" className="block text-sm font-medium text-gray-700">Count of Placed Students</label>
            <input
              id="countOfPlacedStudents"
              type="number"
              placeholder="Number of Students"
              value={countOfPlacedStudents}
              onChange={(e) => setCountOfPlacedStudents(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <input
              id="industry"
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
