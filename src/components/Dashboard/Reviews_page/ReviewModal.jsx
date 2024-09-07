import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Base_Url from '../../../api';

const apiUrl = `${Base_Url}/reviews`;
const coursesApiUrl = `${Base_Url}/courses`; // Endpoint to fetch courses
const usersApiUrl = `${Base_Url}/users`; // Endpoint to fetch users

const Modal = ({ onClose, editMode, review }) => {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]); // State to hold list of courses
  const [users, setUsers] = useState([]); // State to hold list of users

  // Fetch all courses and users when the modal is opened
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(coursesApiUrl);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(usersApiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchCourses();
    fetchUsers();
  }, []);

  // Set initial values for editing
  useEffect(() => {
    if (editMode && review) {
      setCourseId(review.courseId ? review.courseId._id : '');
      setUserId(review.userId ? review.userId._id : '');
      setRating(review.rating || 1);
      setComment(review.comment || '');
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
        await axios.put(`${apiUrl}/${review._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire('Success', 'Review updated successfully!', 'success');
      } else {
        await axios.post(`${apiUrl}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
            <label className="block text-gray-700">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-2"
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-2"
              required
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
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
