import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateReviewForm = ({ review, onReviewUpdated }) => {
  const [formData, setFormData] = useState({
    rating: review ? review.rating : '',
    comment: review ? review.comment : '',
    image: null,
  });

  useEffect(() => {
    if (review) {
      setFormData({
        rating: review.rating,
        comment: review.comment,
        image: null,
      });
    }
  }, [review]);

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
    data.append('rating', formData.rating);
    data.append('comment', formData.comment);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('authToken'); // Fetch the token from localStorage
      const response = await axios.put(`http://localhost:5000/api/reviews/${review._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });
      onReviewUpdated(response.data);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (!review) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Update Review</h2>
      <label className="block mb-2">
        Rating:
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="block w-full mb-4"
          min="1"
          max="5"
          required
        />
      </label>
      <label className="block mb-2">
        Comment:
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="block w-full mb-4"
          required
        />
      </label>
      <label className="block mb-2">
        Image:
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="block w-full mb-4"
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Review
      </button>
    </form>
  );
};

export default UpdateReviewForm;
