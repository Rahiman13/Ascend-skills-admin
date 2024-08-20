import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onDelete, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          &times;
        </button>
        {children}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 mr-2"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
