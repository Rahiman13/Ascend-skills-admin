import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import './Internship.css';
import Base_Url from '../../../api';

Modal.setAppElement('#root');

// const apiUrl = 'https://ascend-skill-be.onrender.com/api/internships';
const apiUrl = `${Base_Url}/internships`;

const InternshipsPage = () => {
  const [internships, setInternships] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [formData, setFormData] = useState({
    courseTitle: '',
    duration: '',
    startDate: '',
    endDate: '',
    curriculum: '{}',  // Assuming JSON structure
    instructorId: '',
    description: '',
    authorName: '',
    image: '',
    review: '',
    video: '',
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await axios.get(apiUrl);
      setInternships(response.data);
    } catch (error) {
      console.error('Error fetching internships:', error);
      Swal.fire('Error', 'Could not fetch internships data.', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenModal = (internship = null) => {
    if (internship) {
      setIsEditing(true);
      setCurrentInternship(internship);
      setFormData({
        ...internship,
        startDate: new Date(internship.startDate).toISOString().split('T')[0],
        endDate: new Date(internship.endDate).toISOString().split('T')[0],
        curriculum: JSON.stringify(internship.curriculum, null, 2),
      });
    } else {
      setIsEditing(false);
      setFormData({
        courseTitle: '',
        duration: '',
        startDate: '',
        endDate: '',
        curriculum: '{}',
        instructorId: '',
        description: '',
        authorName: '',
        image: '',
        review: '',
        video: '',
      });
    }
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setCurrentInternship(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        curriculum: JSON.parse(formData.curriculum),
      };

      if (isEditing) {
        await axios.put(`${apiUrl}/${currentInternship._id}`, updatedData);
        Swal.fire('Success', 'Internship updated successfully!', 'success');
      } else {
        await axios.post(apiUrl, updatedData);
        Swal.fire('Success', 'Internship created successfully!', 'success');
      }
      fetchInternships();
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      Swal.fire('Success', 'Internship deleted successfully!', 'success');
      fetchInternships();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Internships</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Internship
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {internships.map((internship) => (
          <div key={internship._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={internship.image} alt={internship.courseTitle} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{internship.courseTitle}</h2>
              <p className="text-gray-600">Duration: {internship.duration}</p>
              <p className="text-gray-600">Start Date: {new Date(internship.startDate).toLocaleDateString()}</p>
              <p className="text-gray-600">End Date: {new Date(internship.endDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Description: {internship.description}</p>
              <p className="text-gray-600">Author: {internship.authorName}</p>
              <p className="text-gray-600">Review: {internship.review}</p>
              <a className="text-blue-700 font-bold" href={internship.video} target='_blank'>Video Link</a>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => handleOpenModal(internship)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(internship._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Internship' : 'Add Internship'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="curriculum"
            value={formData.curriculum}
            onChange={handleChange}
            placeholder="Curriculum (JSON format)"
            className="w-full p-2 border border-gray-300 rounded font-mono"
            rows={4}
            required
          />
          <input
            type="text"
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            placeholder="Instructor ID"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Review"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? 'Update Internship' : 'Create Internship'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InternshipsPage;
