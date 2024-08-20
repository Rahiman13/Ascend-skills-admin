import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Modal = ({ onClose, editMode, review }) => {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editMode && review) {
      setCourseId(review.courseId._id);
      setUserId(review.userId._id);
      setRating(review.rating);
      setComment(review.comment);
      setImage(null);  // Reset image upload for editing
    }
  }, [editMode, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('userId', userId);
    formData.append('rating', rating);
    formData.append('comment', comment);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editMode) {
        await axios.put(`https://ascend-skills-backend.onrender.com/api/reviews/${review._id}`, formData);
        Swal.fire('Success', 'Review updated successfully!', 'success');
      } else {
        await axios.post('https://ascend-skills-backend.onrender.com/api/reviews', formData);
        Swal.fire('Success', 'Review added successfully!', 'success');
      }
      onClose();
    } catch (error) {
      Swal.fire('Error', 'There was an issue saving the review.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Review' : 'Add Review'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Course ID</label>
            <input 
              type="text" 
              value={courseId} 
              onChange={(e) => setCourseId(e.target.value)} 
              className="w-full px-4 py-2 border rounded mt-2" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input 
              type="text" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              className="w-full px-4 py-2 border rounded mt-2" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <input 
              type="string" 
              value={rating} 
              onChange={(e) => setRating(e.target.value)} 
              min="1" max="5" 
              className="w-full px-4 py-2 border rounded mt-2" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              className="w-full px-4 py-2 border rounded mt-2" 
              required 
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="w-full px-4 py-2 border rounded mt-2" 
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{editMode ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
