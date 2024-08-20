import React, { useState } from 'react';
import axios from 'axios';

const AddContactModal = ({ show, handleClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ascend-skills-backend.onrender.com/api/contacts', {
        name,
        email,
        reason,
        description,
      });
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${show ? 'block' : 'hidden'}`} onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Add New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              id="name" 
              type="text" 
              placeholder="Contact Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Contact Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
            <input 
              id="reason" 
              type="text" 
              placeholder="Contact Reason" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              id="description" 
              placeholder="Contact Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
