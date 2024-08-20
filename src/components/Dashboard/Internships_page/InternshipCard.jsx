// src/components/InternshipCard.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const InternshipCard = ({ internship, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4 w-80">
      <h3 className="text-xl font-semibold mb-2">{internship.courseTitle}</h3>
      <p className="text-gray-700 mb-2">Duration: {internship.duration}</p>
      <p className="text-gray-700 mb-2">Start Date: {new Date(internship.startDate).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-2">End Date: {new Date(internship.endDate).toLocaleDateString()}</p>
      <p className="text-gray-700 mb-2">Instructor: {internship.instructorId.name}</p>
      <p className="text-gray-700 mb-2">Review: {internship.review}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(internship)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(internship._id)}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;
