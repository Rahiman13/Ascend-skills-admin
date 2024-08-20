// src/components/Modal.js
import React from 'react';

const Modal = ({ show, onClose, onSubmit, internshipData, setInternshipData }) => {
  if (!show) return null;

  const handleChange = (e) => {
    setInternshipData({ ...internshipData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl mb-4">{internshipData._id ? 'Edit Internship' : 'Add Internship'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Course Title</label>
            <input
              type="text"
              name="courseTitle"
              value={internshipData.courseTitle || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              value={internshipData.duration || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={internshipData.startDate ? new Date(internshipData.startDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={internshipData.endDate ? new Date(internshipData.endDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Review</label>
            <textarea
              name="review"
              value={internshipData.review || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Curriculum (JSON format)</label>
            <textarea
              name="curriculum"
              value={typeof internshipData.curriculum === 'string' ? internshipData.curriculum : JSON.stringify(internshipData.curriculum)}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Instructor ID</label>
            <input
              type="text"
              name="instructorId"
              value={internshipData.instructorId || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {internshipData._id ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
