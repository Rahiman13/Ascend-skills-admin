import React, { useState } from 'react';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/placements`

const PlacementModal = ({ isOpen, onClose, placement, isEdit }) => {
  const [formData, setFormData] = useState({
    studentName: placement?.studentName || '',
    position: placement?.position || '',
    companyName: placement?.companyName || '',
    studentImage: null,
    description: placement?.description || '',
    studentCollege: placement?.studentCollege || '',
    placedYear: placement?.placedYear || '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'studentImage') {
      setFormData({ ...formData, studentImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/${placement._id}`, formDataToSend);
      } else {
        await axios.post(`${apiUrl}`, formDataToSend);
      }
      onClose();
    } catch (error) {
      console.error('Error saving placement:', error);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Placement' : 'Add Placement'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Student Image</label>
            <input
              type="file"
              name="studentImage"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={!isEdit}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Student College</label>
            <input
              type="text"
              name="studentCollege"
              value={formData.studentCollege}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Placed Year</label>
            <input
              type="number"
              name="placedYear"
              value={formData.placedYear}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacementModal;
