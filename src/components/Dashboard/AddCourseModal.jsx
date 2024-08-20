import React, { useState } from 'react';
import axios from 'axios';

const AddCourseModal = ({ onClose, onAddCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Changed to handle file
  const [courseRating, setCourseRating] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('authorName', authorName);
    formData.append('price', price);
    formData.append('image', image); // Append the selected file
    formData.append('courseRating', courseRating);
    formData.append('category', category);

    try {
      await axios.post('http://localhost:5000/api/courses/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onAddCourse();
      onClose();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Handle file selection
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Course Rating"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-4 text-gray-500">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
