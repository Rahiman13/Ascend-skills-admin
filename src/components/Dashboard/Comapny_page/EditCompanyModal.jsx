import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCompanyModal = ({ show, handleClose, company, onSuccess }) => {
  const [name, setName] = useState(company.name);
  const [logo, setLogo] = useState(company.logo);
  const [location, setLocation] = useState(company.location);
  const [description, setDescription] = useState(company.description);
  const [countOfPlacedStudents, setCountOfPlacedStudents] = useState(company.countOfPlacedStudents);
  const [industry, setIndustry] = useState(company.industry);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ascend-skills-backend.onrender.com/api/companies/${company._id}`, {
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
      console.error('Error updating company:', error);
    }
  };

  useEffect(() => {
    if (company) {
      setName(company.name);
      setLogo(company.logo);
      setLocation(company.location);
      setDescription(company.description);
      setCountOfPlacedStudents(company.countOfPlacedStudents);
      setIndustry(company.industry);
    }
  }, [company]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`}
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Company</h2>
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
              Update Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal;
