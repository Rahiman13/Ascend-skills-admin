import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Base_Url from '../../../api';

const apiUrl =`${Base_Url}/contacts`

Modal.setAppElement('#root');

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    name: '',
    email: '',
    reason: '',
    description: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const openModal = (contact = null) => {
    if (contact) {
      setCurrentContact(contact);
      setIsEdit(true);
    } else {
      setCurrentContact({
        name: '',
        email: '',
        reason: '',
        description: '',
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({
      name: '',
      email: '',
      reason: '',
      description: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/${currentContact._id}`, currentContact);
      } else {
        await axios.post(`${apiUrl}`, currentContact);
      }
      fetchContacts();
      closeModal();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Contact
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{contact.name}</h2>
            <p className="text-gray-700">{contact.email}</p>
            <p className="text-gray-700">{contact.reason}</p>
            <p className="text-gray-600">{contact.description}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => openModal(contact)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-8 max-w-lg mx-auto shadow-lg mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? 'Edit Contact' : 'Add Contact'}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={currentContact.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={currentContact.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <input
              type="text"
              name="reason"
              value={currentContact.reason}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={currentContact.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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
      </Modal>
    </div>
  );
};

export default ContactsPage;
