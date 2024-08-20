// src/pages/AddressesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '90%',
  },
};

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    email: [],
    phone_number: [],
    instagram_link: '',
    facebook_link: '',
    linkedin_link: '',
    twitter_link: '',
    other_links: {},
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('https://ascend-skills-backend.onrender.com/api/addresses');
      setAddresses(response.data.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const openModal = (address = null) => {
    if (address) {
      setCurrentAddress(address);
      setFormData({
        location: address.location,
        email: address.email,
        phone_number: address.phone_number,
        instagram_link: address.instagram_link,
        facebook_link: address.facebook_link,
        linkedin_link: address.linkedin_link,
        twitter_link: address.twitter_link,
        other_links: address.other_links,
      });
      setEditMode(true);
    } else {
      setFormData({
        location: '',
        email: [],
        phone_number: [],
        instagram_link: '',
        facebook_link: '',
        linkedin_link: '',
        twitter_link: '',
        other_links: {},
      });
      setEditMode(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentAddress(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'phone_number') {
      setFormData({ ...formData, [name]: value.split(',') });
    } else if (name.startsWith('other_links')) {
      const [key, index] = name.split('_').slice(2);
      const updatedLinks = { ...formData.other_links, [key]: value };
      setFormData({ ...formData, other_links: updatedLinks });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`https://ascend-skills-backend.onrender.com/api/addresses/${currentAddress._id}`, formData);
        Swal.fire('Updated!', 'Address has been updated.', 'success');
      } else {
        await axios.post('https://ascend-skills-backend.onrender.com/api/addresses', formData);
        Swal.fire('Created!', 'Address has been added.', 'success');
      }
      fetchAddresses();
      closeModal();
    } catch (error) {
      console.error('Error saving address:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ascend-skills-backend.onrender.com/api/addresses/${id}`);
      Swal.fire('Deleted!', 'Address has been deleted.', 'success');
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Addresses</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          <FaPlus className="mr-2" /> Add Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <div key={address._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{address.location}</h2>
            <p className="text-gray-700"><strong>Email:</strong> {address.email.join(', ')}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {address.phone_number.join(', ')}</p>
            <p className="text-gray-700"><strong>Instagram:</strong> {address.instagram_link}</p>
            <p className="text-gray-700"><strong>Facebook:</strong> {address.facebook_link}</p>
            <p className="text-gray-700"><strong>LinkedIn:</strong> {address.linkedin_link}</p>
            <p className="text-gray-700"><strong>Twitter:</strong> {address.twitter_link}</p>
            <p className="text-gray-700"><strong>Other Links:</strong> {Object.entries(address.other_links).map(([key, link]) => (
              <span key={key} className="block">{key}: {link}</span>
            ))}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => openModal(address)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(address._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Address Modal"
      >
        <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Address' : 'Add Address'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email (comma-separated)</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email.join(', ')}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone_number">Phone Numbers (comma-separated)</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number.join(', ')}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="instagram_link">Instagram Link</label>
            <input
              type="text"
              id="instagram_link"
              name="instagram_link"
              value={formData.instagram_link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="facebook_link">Facebook Link</label>
            <input
              type="text"
              id="facebook_link"
              name="facebook_link"
              value={formData.facebook_link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="linkedin_link">LinkedIn Link</label>
            <input
              type="text"
              id="linkedin_link"
              name="linkedin_link"
              value={formData.linkedin_link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="twitter_link">Twitter Link</label>
            <input
              type="text"
              id="twitter_link"
              name="twitter_link"
              value={formData.twitter_link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Other Links</label>
            {Object.entries(formData.other_links).map(([key, value], index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  name={`other_links_${key}`}
                  value={value}
                  onChange={handleChange}
                  placeholder={`Link for ${key}`}
                  className="w-full p-2 border border-gray-300 rounded mr-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedLinks = { ...formData.other_links };
                    delete updatedLinks[key];
                    setFormData({ ...formData, other_links: updatedLinks });
                  }}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const key = prompt('Enter link name');
                if (key) {
                  setFormData({ ...formData, other_links: { ...formData.other_links, [key]: '' } });
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Add New Link
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            {editMode ? 'Update Address' : 'Add Address'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddressesPage;
