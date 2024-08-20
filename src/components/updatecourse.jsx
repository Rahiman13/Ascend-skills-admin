import React, { useState } from 'react';
import axios from 'axios';

const UpdateCourseForm = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    duration: course.duration,
    author: course.author,
    price: course.price,
    category: course.category,
    curriculum: JSON.stringify(course.curriculum),
  });

  const [authorImage, setAuthorImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'authorImage') {
      setAuthorImage(e.target.files[0]);
    } else if (e.target.name === 'image') {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('duration', formData.duration);
    data.append('author', formData.author);
    data.append('price', formData.price);
    data.append('category', formData.category);

    try {
      const curriculumJson = JSON.parse(formData.curriculum);
      data.append('curriculum', JSON.stringify(curriculumJson));
    } catch (error) {
      alert('Curriculum must be a valid JSON object');
      return;
    }

    if (authorImage) {
      data.append('authorImage', authorImage);
    }

    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${course._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      onClose();
      // Handle success (e.g., display a success message, refresh the course list, etc.)
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response received from server.');
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-scroll">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
          Duration (hours)
        </label>
        <input
          type="number"
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
          Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="curriculum">
          Curriculum (JSON format)
        </label>
        <textarea
          name="curriculum"
          id="curriculum"
          value={formData.curriculum}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorImage">
          Author Image
        </label>
        <input
          type="file"
          name="authorImage"
          id="authorImage"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Course Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
      >
        Update Course
      </button>
    </form>
  );
};

export default UpdateCourseForm;
