import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{contact.name}</h2>
        <p className="text-gray-600">{contact.email}</p>
        <p className="text-gray-600">{contact.reason}</p>
        <p className="text-gray-600">{contact.description}</p>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => onEdit(contact)} 
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit size={20} />
        </button>
        <button 
          onClick={() => onDelete(contact._id)} 
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
