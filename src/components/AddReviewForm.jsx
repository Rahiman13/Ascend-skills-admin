import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ onReviewAdded }) => {
  const [formData, setFormData] = useState({
    courseId: '',
    userId: '',
    rating: '',
    comment: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('courseId', formData.courseId);
    data.append('userId', formData.userId);
    data.append('rating', formData.rating);
    data.append('comment', formData.comment);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', data);
      onReviewAdded(response.data);
      setFormData({
        courseId: '',
        userId: '',
        rating: '',
        comment: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Review</h2>
      <input
        type="text"
        name="courseId"
        placeholder="Course ID"
        value={formData.courseId}
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        required
        min="1"
        max="5"
        className="block w-full mb-2 p-2 border"
      />
      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="block w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
