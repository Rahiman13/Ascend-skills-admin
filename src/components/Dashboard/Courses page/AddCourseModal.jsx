import React, { useState } from 'react';
import axios from 'axios';

const AddCourseModal = ({ onClose, onCourseAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorImage, setAuthorImage] = useState(null);
  const [courseRating, setCourseRating] = useState('');
  const [curriculum, setCurriculum] = useState({});
  const [reviewIds, setReviewIds] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAuthorImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const handleCurriculumChange = (module, topics) => {
    setCurriculum(prevCurriculum => ({
      ...prevCurriculum,
      [module]: topics.split(',').map(topic => topic.trim())
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('authorId', authorId);
    formData.append('authorName', authorName);
    if (authorImage) formData.append('authorImage', authorImage);
    formData.append('courseRating', courseRating);
    formData.append('curriculum', JSON.stringify(curriculum));
    formData.append('reviews', JSON.stringify(reviewIds));

    try {
      await axios.post('https://ascend-skills-backend.onrender.com/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCourseAdded();
      onClose();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Duration (in hours)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Author ID"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAuthorImageChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="number"
            placeholder="Course Rating (out of 5)"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Curriculum (Enter module topics separated by commas)"
            onChange={(e) => handleCurriculumChange('Module1', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <textarea
            placeholder="Review IDs (Comma separated IDs)"
            value={reviewIds}
            onChange={(e) => setReviewIds(e.target.value.split(','))}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="text-red-500 mr-4">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
