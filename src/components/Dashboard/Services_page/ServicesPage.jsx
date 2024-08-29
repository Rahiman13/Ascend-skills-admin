// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Base_Url from '../../../api';

const apiUrl=`${Base_Url}/services`
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

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    serviceTitle: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({
        serviceTitle: service.serviceTitle,
        image: service.image,
        description: service.description,
      });
      setEditMode(true);
    } else {
      setFormData({ serviceTitle: '', image: '', description: '' });
      setEditMode(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentService(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${currentService._id}`, formData);
        Swal.fire('Updated!', 'Service has been updated.', 'success');
      } else {
        await axios.post(`${apiUrl}`, formData);
        Swal.fire('Created!', 'Service has been added.', 'success');
      }
      fetchServices();
      closeModal();
    } catch (error) {
      console.error('Error saving service:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      Swal.fire('Deleted!', 'Service has been deleted.', 'success');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          <FaPlus className="mr-2" /> Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={service.image} alt={service.serviceTitle} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{service.serviceTitle}</h2>
            <p className="text-gray-700">{service.description}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => openModal(service)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(service._id)}
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
        contentLabel="Service Modal"
      >
        <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="serviceTitle">Service Title</label>
            <input
              type="text"
              id="serviceTitle"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              {editMode ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesPage;
